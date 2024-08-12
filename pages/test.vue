<template>
  <div class="flex overflow-x-hidden">
    <div
      v-if="$fetchState.pending"
      class="flex h-screen items-center justify-center"
    >
      <div
        class="
          w-40
          h-40
          border-t-4 border-b-4 border-yellow-750
          rounded-full
          animate-spin
          m-auto
        "
      ></div>
    </div>
    <div v-if="error.length > 0">
      <div class="flex items-center justify-center">
        <button class="btn btn-error">{{ error }}</button>
      </div>
    </div>
    <div v-else class="flex-1">
      <div v-if="joinRoomButton" id="join">
        <div class="flex items-center justify-center">
          <button class="btn btn-primary" @click="joinRoom">Join class</button>
        </div>
      </div>
      <div v-if="!joinRoomButton" class="flex h-almost relative">
        <div
          id="localMedia"
          class="z-40 absolute bottom-0 h-48 w-48 left-0 box-border"
        ></div>
        <div
          id="remoteVideos"
          class="z-40 w-full absolute flex-1 box-border h-video text-center"
        ></div>
        <div id="remoteAudios" class="hidden"></div>
      </div>
      <div v-if="!joinRoomButton" class="z-50 flex justify-center bg-base-200">
        <span v-if="enableMuteAll">
          <button
            v-if="muteAll"
            id="muteAll"
            class="btn btn-circle bg-primary"
            @click="muteRoom"
          >
            <font-awesome-icon icon="users-slash" />
          </button>
          <button
            v-if="unmuteAll"
            id="unmuteAll"
            class="btn btn-circle bg-gray-500"
            @click="unmuteRoom"
          >
            <font-awesome-icon icon="users-slash" />
          </button>
        </span>
        <span v-if="enableAudio">
          <button
            id="startAudioButton"
            v-if="startAudioButton"
            @click="enableMic"
            class="btn btn-circle bg-red-650"
          >
            <font-awesome-icon icon="microphone-slash" />
          </button>
          <button
            id="stopAudioButton"
            v-if="stopAudioButton"
            @click="disableMic"
            class="btn btn-circle bg-gray-500"
          >
            <font-awesome-icon icon="microphone" />
          </button>
        </span>
        <span v-if="enableVideo">
          <button
            v-if="startVideoButton"
            id="startVideoButton"
            @click="enableWebcam"
            class="btn btn-circle bg-red-650"
          >
            <font-awesome-icon icon="video-slash" />
          </button>
          <button
            v-if="stopVideoButton"
            id="stopVideoButton"
            @click="disableWebcam"
            class="btn btn-circle bg-gray-500"
          >
            <font-awesome-icon icon="video" />
          </button>
        </span>
        <span v-if="enablePresent">
          <button
            v-if="startScreenButton"
            id="startScreenButton"
            @click="enableShare"
            class="btn btn-circle bg-red-650"
          >
            <font-awesome-icon icon="upload" />
          </button>
          <button
            v-if="stopScreenButton"
            id="stopScreenButton"
            @click="disableShare"
            class="btn btn-circle bg-blue-600"
          >
            <font-awesome-icon icon="upload" />
          </button>
        </span>
        <div v-if="enableChatSidebar" class="indicator">
          <div
            v-if="newMessage"
            class="indicator-item badge bg-success"
          ></div>
          <button
            class="btn btn-circle btn-warning"
            @click="
              sidebarChat = !sidebarChat;
              newMessage = false;
            "
          >
            <font-awesome-icon icon="comment-alt" />
          </button>
        </div>
        <button
          v-if="exitButton"
          id="exitButton"
          @click="exitRoom"
          class="btn btn-circle bg-info"
        >
          <font-awesome-icon icon="sign-out-alt" class="" />
        </button>
      </div>
    </div>
    <aside
      v-if="sidebarChat"
      class="
        h-almost
        flex-shrink-0
        w-64
        flex flex-col
        border-r
        transition-all
        duration-300
      "
    >
      <RoomChat @message="setNewMessage" />
    </aside>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import socket from "~/webrtc/socket";
import socket1 from "~/webrtc/chatsocket";
import deviceInfo from "~/webrtc/deviceInfo";
import * as mediasoupClient from "mediasoup-client";
const VIDEO_CONSTRAINS = {
  qvga: { width: { ideal: 320 }, height: { ideal: 240 } },
  vga: { width: { ideal: 640 }, height: { ideal: 480 } },
  hd: { width: { ideal: 1280 }, height: { ideal: 720 } },
};
const PC_PROPRIETARY_CONSTRAINTS = {
  optional: [{ googDscp: true }],
};

// Used for simulcast webcam video.
const WEBCAM_SIMULCAST_ENCODINGS = [
  { scaleResolutionDownBy: 4, maxBitrate: 500000 },
  { scaleResolutionDownBy: 2, maxBitrate: 1000000 },
  { scaleResolutionDownBy: 1, maxBitrate: 5000000 },
];

// Used for VP9 webcam video.
const WEBCAM_KSVC_ENCODINGS = [{ scalabilityMode: "S3T3_KEY" }];

// Used for simulcast screen sharing.
const SCREEN_SHARING_SIMULCAST_ENCODINGS = [
  { dtx: true, maxBitrate: 1500000 },
  { dtx: true, maxBitrate: 6000000 },
];

// Used for VP9 screen sharing.
const SCREEN_SHARING_SVC_ENCODINGS = [{ scalabilityMode: "S3T3", dtx: true }];
export default {
  middleware: "authenticated",
  data() {
    return {
      joinRoomButton: true,
      enableMuteAll: false,
      roomName: this.$route.params.id,
      userRole: null,
      enableAudio: false,
      enableVideo: false,
      enablePresent: false,
      enableUserSidebar: false,
      enableChatSidebar: true,
      exitButton: true,
      startAudioButton: false,
      stopAudioButton: false,
      startVideoButton: false,
      stopVideoButton: false,
      startScreenButton: false,
      stopScreenButton: false,
      sidebarChat: false,
      muteAll: true,
      unmuteAll: false,
      params: {
        // mediasoup params
        encodings: [
          {
            rid: "r0",
            maxBitrate: 100000,
            scalabilityMode: "S1T3",
          },
          {
            rid: "r1",
            maxBitrate: 300000,
            scalabilityMode: "S1T3",
          },
          {
            rid: "r2",
            maxBitrate: 900000,
            scalabilityMode: "S1T3",
          },
        ],
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
        codecOptions: {
          videoGoogleStartBitrate: 1000,
        },
      },
      rtpCapabilities: null,
      device: null,
      producerTransport: null,
      producer: null,
      consumerTransports: [],
      consumer: null,
      _micProducer: null,
      _webcamProducer: null,
      _shareProducer: null,
      _webcams: new Map(),
      webcam: {
        device: null,
        resolution: "hd",
      },
      _forceH264: true,
      _forceVP9: false,
      _useSimulcast: false,
      newMessage: false,
      batch: {},
      singlestu: {},
      error: "",
    };
  },
  async fetch() {
    let allow = false;
    try {
      const batch = await this.$axios.get(
        "batches/get-single-batch/?meeting_id=" + this.$route.params.id
      );
      const single = await this.$axios.get(
        "batches/get-single-batch-students/?meeting_id=" + this.$route.params.id
      );
      this.singlestu = single.data.results[0];

      if (batch.data.total > 0) {
        allow = true;
        this.batch = batch.data.results[0];
        if (this.batch.status == 2) {
          allow = false;
          this.error = "Batch is closed!";
        }
        // if (this.batch.not_verified > 0 && this.batch.status == 1) {
        //   allow = false;
        //   this.error = "Batch is not verified!";
        // }
        for (var i = 0; i < this.$store.state.auth.user.groups.length; i++) {
          if (this.$store.state.auth.user.groups[i].name === "trainer") {
            this.userRole = "trainer";
            this.enableAudio = true;
            this.enableVideo = true;
            this.enablePresent = true;
            this.enableUserSidebar = true;
            this.enableChatSidebar = true;
            this.startAudioButton = true;
            this.startVideoButton = true;
            this.startScreenButton = true;
            this.enableMuteAll = true;
          }
          if (this.$store.state.auth.user.groups[i].name === "student") {
            this.userRole = "student";
            this.enableAudio = true;
            this.startAudioButton = true;
          }
        }

        if (this.userRole === "student" && !this.singlestu) {
          this.error = "You don't have permission to attend the session!";
        }
        if (
          this.userRole === "student" &&
          this.singlestu &&
          this.singlestu.blocked == true
        ) {
          this.error = "User Blocked";
        }

        if (this.userRole === "trainer") {
          if (this.batch.trainer == this.$store.state.auth.user.id) {
            socket.auth = {
              username: this.$store.state.auth.user.name,
              userID: this.$store.state.auth.user.id,
              role: this.userRole,
            };
            socket.connect();
            socket1.auth = {
              sessionID: this.$store.state.auth.user.id,
              username: this.$store.state.auth.user.name,
              userID: this.$store.state.auth.user.id,
              roomID: this.roomName,
              role: this.userRole,
            };
            socket1.connect();
            this.socketActions();
            let addAtt = await this.$axios.post(
              "batches/add-batch-attendance/",
              {
                bid: this.batch.id,
                uid: this.$store.state.auth.user.id,
                role: this.userRole,
              }
            );
          } else {
            this.error = "You do not have permission!";
          }
        } else if (this.userRole === "student" && this.singlestu) {
          socket.auth = {
            username: this.$store.state.auth.user.name,
            userID: this.$store.state.auth.user.id,
            role: this.userRole,
          };
          socket.connect();
          socket1.auth = {
            sessionID: this.$store.state.auth.user.id,
            username: this.$store.state.auth.user.name,
            userID: this.$store.state.auth.user.id,
            roomID: this.roomName,
            role: this.userRole,
          };
          socket1.connect();
          this.socketActions();
          let addAtt = await this.$axios.post("batches/add-batch-attendance/", {
            bid: this.batch.id,
            uid: this.$store.state.auth.user.id,
            role: this.userRole,
          });
        }
      } else {
        allow = false;
        this.error = "Batch is closed or does not exist!";
      }
    } catch (err) {
      allow = false;
      this.error = "Batch is closed or does not exist!";
      await this.$store.dispatch("alerts/alert", {
        text: "Something went wrong, please try again or contact admin",
        type: "error",
      });
    }
  },
  methods: {
    setNewMessage(message) {
      this.newMessage = message;
    },
    socketActions() {
      socket.on("session", ({ sessionID, userID }) => {
        socket.auth = { sessionID };
        localStorage.setItem("sessionID", sessionID);
        socket.userID = userID;
      });
      socket.on("muteRoom", async () => {
        await this.disableMic();
        this.enableAudio = false;
        this.$store.dispatch("alerts/alert", {
          text: `Trainer has muted the Classroom`,
          type: "info",
        });
      });
      socket.on("unmuteRoom", () => {
        this.enableAudio = true;
        this.$store.dispatch("alerts/alert", {
          text: `Trainer has un-muted the Classroom`,
          type: "info",
        });
      });
      socket.on("new-producer", ({ producerId }) =>
        this.signalNewConsumerTransport(producerId)
      );
      socket.on("producer-closed", ({ remoteProducerId }) => {
        // server notification is received when a producer is closed
        // we need to close the client-side consumer and associated transport
        try {
          const producerToClose = this.consumerTransports.find(
            (transportData) => transportData.producerId === remoteProducerId
          );
          producerToClose.consumerTransport.close();
          producerToClose.consumer.close();

          // remove the consumer transport from the list
          this.consumerTransports = this.consumerTransports.filter(
            (transportData) => transportData.producerId !== remoteProducerId
          );

          // remove the video div element
          let elem = document.getElementById(remoteProducerId);
          elem.parentNode.removeChild(elem);
        } catch (err) {
          console.log("producer not found", err);
        }
      });
      socket.on("disconnect", () => {
        if (this._micProducer) {
          this.disableMic();
        }
        if (this._webcamProducer) {
          this.disableWebcam();
        }
        if (this._shareProducer) {
          this.disableShare();
        }

        location.reload();
      });
    },
    getProducers() {
      socket.emit("getProducers", (producerIds) => {
        // for each of the producer create a consumer
        producerIds.forEach((id) => this.signalNewConsumerTransport(id));
        // producerIds.forEach(this.signalNewConsumerTransport)
      });
    },
    joinRoom() {
      this.joinRoomButton = false;
      let roomName = this.roomName;
      socket.emit("joinRoom", { roomName }, (data) => {
        this.rtpCapabilities = data.rtpCapabilities;
        if (data.muted) {
          if (this.userRole === "student") {
            this.disableMic();
            this.enableAudio = false;
            this.$store.dispatch("alerts/alert", {
              text: `Trainer has muted the Classroom`,
              type: "info",
            });
          }
          if (this.userRole === "trainer") {
            this.muteAll = false;
            this.unmuteAll = true;
            this.$store.dispatch("alerts/alert", {
              text: `Trainer has muted the Classroom`,
              type: "info",
            });
          }
        }
        // once we have rtpCapabilities from the Router, create Device
        this.createDevice();
      });
    },
    async createDevice() {
      try {
        this.device = new mediasoupClient.Device();
        await this.device.load({
          // see getRtpCapabilities() below
          routerRtpCapabilities: this.rtpCapabilities,
        });
        await this.createSendTransport();
        await this.getProducers();
      } catch (error) {
        console.log(error);
        if (error.name === "UnsupportedError")
          console.warn("browser not supported");
      }
    },
    createSendTransport() {
      socket.emit(
        "createWebRtcTransport",
        { consumer: false },
        ({ params }) => {
          if (params.error) {
            console.log(params.error);
            return;
          }
          // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
          this.producerTransport = this.device.createSendTransport(params);

          this.producerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await socket.emit("transport-connect", {
                  dtlsParameters,
                });
                callback();
              } catch (error) {
                errback(error);
              }
            }
          );

          this.producerTransport.on(
            "produce",
            async (parameters, callback, errback) => {
              try {
                await socket.emit(
                  "transport-produce",
                  {
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                  },
                  ({ id, producersExist }) => {
                    // Tell the transport that parameters were transmitted and provide it with the
                    // server side producer's id.
                    callback({ id });

                    // if producers exist, then join room
                    // if (producersExist) this.getProducers()
                  }
                );
              } catch (error) {
                errback(error);
              }
            }
          );
          this.producerTransport.on("connectionstatechange", function (state) {
            switch (state) {
              case "connecting":
                break;

              case "connected":
                break;

              case "failed":
                this.producerTransport.close();
                break;

              default:
                break;
            }
          });

          //   this.connectSendTransport()
        }
      );
    },
    async enableMic() {
      if (this._micProducer) return;

      if (!this.device.canProduce("audio")) {
        console.log("enableMic() | cannot produce audio");
        return;
      }

      let track;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        track = stream.getAudioTracks()[0];
        this._micProducer = await this.producerTransport.produce({
          track,
          codecOptions: {
            opusStereo: 1,
            opusDtx: 1,
          },
          // NOTE: for testing codec selection.
          // codec : this._mediasoupDevice.rtpCapabilities.codecs
          // 	.find((codec) => codec.mimeType.toLowerCase() === 'audio/pcma')
        });

        this._micProducer.on("transportclose", () => {
          this._micProducer = null;
        });

        this._micProducer.on("trackended", () => {
          this.$store.dispatch("alerts/alert", {
            text: `Microphone disconnected!`,
            type: "error",
          });

          this.disableMic().catch(() => {});
        });
        this.startAudioButton = false;
        this.stopAudioButton = true;
      } catch (error) {
        console.log("enableMic() | failed:%o", error);
        this.$store.dispatch("alerts/alert", {
          text: `Error enabling microphone: ${error}`,
          type: "error",
        });
        if (track) track.stop();
      }
    },
    async disableMic() {
      if (!this._micProducer) return;
      try {
        await this._micProducer.close();
        await socket.emit("producer-close", {
          producerId: this._micProducer.id,
        });
        this.startAudioButton = true;
        this.stopAudioButton = false;
      } catch (error) {
        this.$store.dispatch("alerts/alert", {
          text: `Error closing Microphone from server side! ${error}`,
          type: "error",
        });
      }

      this._micProducer = null;
    },
    async updateWebcams() {
      // Reset the list.
      this._webcams = new Map();

      const devices = await navigator.mediaDevices.enumerateDevices();

      for (const device of devices) {
        if (device.kind !== "videoinput") continue;

        this._webcams.set(device.deviceId, device);
      }

      const array = Array.from(this._webcams.values());
      const len = array.length;
      const currentWebcamId = this.webcamdevice
        ? this.webcamdevice.deviceId
        : undefined;

      if (len === 0) this.webcamdevice = null;
      else if (!this._webcams.has(currentWebcamId))
        this.webcamdevice = array[0];
    },
    _getWebcamType(device) {
      if (/(back|rear)/i.test(device.label)) {
        // console.log('_getWebcamType() | it seems to be a back camera')

        return "back";
      } else {
        // console.log('_getWebcamType() | it seems to be a front camera')

        return "front";
      }
    },

    async connectSendTransport() {
      this.producer = await this.producerTransport.produce(this.params);

      this.producer.on("trackended", () => {
        // console.log('track ended')
        // close video track
      });

      this.producer.on("transportclose", () => {
        // console.log('transport ended')
        // close video track
      });
    },
    async enableWebcam() {
      if (this._webcamProducer) return;
      else if (this._shareProducer) await this.disableShare();

      if (!this.device.canProduce("video")) {
        console.log("enableWebcam() | cannot produce video");

        return;
      }

      let track;
      let device;

      try {
        await this.updateWebcams();
        device = this.webcamdevice;

        const { resolution } = this.webcam;

        if (!device) throw new Error("no webcam devices");

        console.log("enableWebcam() | calling getUserMedia()");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { ideal: device.deviceId },
            ...VIDEO_CONSTRAINS[resolution],
          },
        });

        track = stream.getVideoTracks()[0];

        let encodings;
        let codec;
        const codecOptions = {
          videoGoogleStartBitrate: 1000,
        };

        if (this._forceH264) {
          codec = this.device.rtpCapabilities.codecs.find(
            (c) => c.mimeType.toLowerCase() === "video/h264"
          );

          if (!codec) {
            throw new Error(
              "desired H264 codec+configuration is not supported"
            );
          }
        } else if (this._forceVP9) {
          codec = this.device.rtpCapabilities.codecs.find(
            (c) => c.mimeType.toLowerCase() === "video/vp9"
          );

          if (!codec) {
            throw new Error("desired VP9 codec+configuration is not supported");
          }
        }

        if (this._useSimulcast) {
          // If VP9 is the only available video codec then use SVC.
          const firstVideoCodec =
            this._mediasoupDevice.rtpCapabilities.codecs.find(
              (c) => c.kind === "video"
            );

          if (
            (this._forceVP9 && codec) ||
            firstVideoCodec.mimeType.toLowerCase() === "video/vp9"
          ) {
            encodings = WEBCAM_KSVC_ENCODINGS;
          } else {
            encodings = WEBCAM_SIMULCAST_ENCODINGS;
          }
        }

        this._webcamProducer = await this.producerTransport.produce({
          track,
          encodings,
          codecOptions,
          codec,
        });
        let elem;
        elem = document.createElement("video");
        elem.srcObject = stream;
        elem.id = this._webcamProducer.id;
        elem.playsinline = false;
        elem.autoplay = true;
        elem.className = "vid";
        document.getElementById("localMedia").appendChild(elem);
        // this.handleFS(elem.id)
        this._webcamProducer.on("transportclose", () => {
          this._webcamProducer = null;
        });

        this._webcamProducer.on("trackended", () => {
          this.$store.dispatch("alerts/alert", {
            text: `Webcam disconnected!`,
            type: "error",
          });

          this.disableWebcam().catch(() => {});
        });
        this.startVideoButton = false;
        this.stopVideoButton = true;
      } catch (error) {
        console.log("enableWebcam() | failed:%o", error);
        this.$store.dispatch("alerts/alert", {
          text: `Error enabling webcam: ${error}`,
          type: "error",
        });

        if (track) track.stop();
      }
    },
    async disableWebcam() {
      console.log("disableWebcam()");

      if (!this._webcamProducer) return;
      try {
        await this._webcamProducer.close();
        await socket.emit("producer-close", {
          producerId: this._webcamProducer.id,
        });
        this.startVideoButton = true;
        this.stopVideoButton = false;
      } catch (error) {
        this.$store.dispatch("alerts/alert", {
          text: `Error closing Microphone from server side! ${error}`,
          type: "error",
        });
      }

      // this.event(_EVENTS.removeProducer, {
      //   producerId: this._webcamProducer.id,
      // })

      let elem = document.getElementById(this._webcamProducer.id);
      elem.parentNode.removeChild(elem);
      this._webcamProducer = null;
    },
    async enableShare() {
      console.log("enableShare()");

      if (this._shareProducer) return;
      else if (this._webcamProducer) await this.disableWebcam();

      if (!this.device.canProduce("video")) {
        console.log("enableShare() | cannot produce video");

        return;
      }

      let track;

      try {
        console.log("enableShare() | calling getUserMedia()");

        const stream = await navigator.mediaDevices.getDisplayMedia({
          audio: false,
          video: {
            displaySurface: "monitor",
            logicalSurface: true,
            cursor: true,
            width: { max: 1920 },
            height: { max: 1080 },
            frameRate: { max: 30 },
          },
        });

        track = stream.getVideoTracks()[0];
        let encodings;
        let codec;
        const codecOptions = {
          videoGoogleStartBitrate: 1000,
        };

        if (this._forceH264) {
          codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
            (c) => c.mimeType.toLowerCase() === "video/h264"
          );

          if (!codec) {
            throw new Error(
              "desired H264 codec+configuration is not supported"
            );
          }
        } else if (this._forceVP9) {
          codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
            (c) => c.mimeType.toLowerCase() === "video/vp9"
          );

          if (!codec) {
            throw new Error("desired VP9 codec+configuration is not supported");
          }
        }

        if (this._useSharingSimulcast) {
          // If VP9 is the only available video codec then use SVC.
          const firstVideoCodec =
            this._mediasoupDevice.rtpCapabilities.codecs.find(
              (c) => c.kind === "video"
            );

          if (
            (this._forceVP9 && codec) ||
            firstVideoCodec.mimeType.toLowerCase() === "video/vp9"
          ) {
            encodings = SCREEN_SHARING_SVC_ENCODINGS;
          } else {
            encodings = SCREEN_SHARING_SIMULCAST_ENCODINGS.map((encoding) => ({
              ...encoding,
              dtx: true,
            }));
          }
        }

        this._shareProducer = await this.producerTransport.produce({
          track,
          encodings,
          codecOptions,
          codec,
          appData: {
            share: true,
          },
        });
        let elem;
        elem = document.createElement("video");
        elem.srcObject = stream;
        elem.id = this._shareProducer.id;
        elem.playsinline = false;
        elem.autoplay = true;
        elem.className = "vid";
        document.getElementById("localMedia").appendChild(elem);
        // this.handleFS(elem.id)

        this._shareProducer.on("transportclose", () => {
          this._shareProducer = null;
        });

        this._shareProducer.on("trackended", () => {
          this.$store.dispatch("alerts/alert", {
            text: `Share disconnected!`,
            type: "error",
          });

          this.disableShare().catch(() => {});
        });
        this.startScreenButton = false;
        this.stopScreenButton = true;
      } catch (error) {
        console.log("enableShare() | failed:%o", error);

        if (error.name !== "NotAllowedError") {
          this.$store.dispatch("alerts/alert", {
            text: `Error sharing: ${error}`,
            type: "error",
          });
        }

        if (track) track.stop();
      }
    },
    async disableShare() {
      if (!this._shareProducer) return;

      this._shareProducer.close();

      // this.event(_EVENTS.removeProducer, { producerId: this._shareProducer.id })

      try {
        await socket.emit("producer-close", {
          producerId: this._shareProducer.id,
        });
        this.startScreenButton = true;
        this.stopScreenButton = false;
      } catch (error) {
        this.$store.dispatch("alerts/alert", {
          text: `Error closing server-side share Producer: ${error}`,
          type: "error",
        });
      }
      let elem = document.getElementById(this._shareProducer.id);
      elem.parentNode.removeChild(elem);

      this._shareProducer = null;
    },
    async signalNewConsumerTransport(remoteProducerId) {
      await socket.emit(
        "createWebRtcTransport",
        { consumer: true },
        ({ params }) => {
          // The server sends back params needed
          // to create Send Transport on the client side
          if (params.error) {
            console.log(params.error);
            return;
          }

          let consumerTransport;
          try {
            consumerTransport = this.device.createRecvTransport(params);
          } catch (error) {
            console.log(error);
            return;
          }

          consumerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                // Signal local DTLS parameters to the server side transport
                // see server's socket.on('transport-recv-connect', ...)
                await socket.emit("transport-recv-connect", {
                  dtlsParameters,
                  serverConsumerTransportId: params.id,
                });

                // Tell the transport that parameters were transmitted.
                callback();
              } catch (error) {
                // Tell the transport that something was wrong
                errback(error);
              }
            }
          );

          this.connectRecvTransport(
            consumerTransport,
            remoteProducerId,
            params.id
          );
        }
      );
    },

    async connectRecvTransport(
      consumerTransport,
      remoteProducerId,
      serverConsumerTransportId
    ) {
      await socket.emit(
        "consume",
        {
          rtpCapabilities: this.device.rtpCapabilities,
          remoteProducerId,
          serverConsumerTransportId,
        },
        async ({ params }) => {
          if (params.error) {
            console.log("Cannot Consume");
            return;
          }
          const consumer = await consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          this.consumerTransports = [
            ...this.consumerTransports,
            {
              consumerTransport,
              serverConsumerTransportId: params.id,
              producerId: remoteProducerId,
              consumer,
            },
          ];

          // destructure and retrieve the video track from the producer
          const { track } = consumer;
          let elem;
          if (track.kind === "video") {
            elem = document.createElement("video");
            elem.srcObject = new MediaStream([track]);
            elem.id = remoteProducerId;
            elem.playsinline = false;
            elem.autoplay = true;
            elem.volume = 0;
            elem.className =
              "h-full w-full absolute object-contain overflow-hidden";
            document.getElementById("remoteVideos").appendChild(elem);
            // this.handleFS(elem.id)
          } else {
            elem = document.createElement("audio");
            elem.srcObject = new MediaStream([track]);
            elem.id = remoteProducerId;
            elem.playsinline = false;
            elem.autoplay = true;
            document.getElementById("remoteAudios").appendChild(elem);
          }

          // the server consumer started with media paused
          // so we need to inform the server to resume
          socket.emit("consumer-resume", {
            serverConsumerId: params.serverConsumerId,
          });
        }
      );
    },
    muteRoom() {
      socket.emit("muteRoom");
      this.muteAll = false;
      this.unmuteAll = true;
    },
    unmuteRoom() {
      socket.emit("unmuteRoom");
      this.muteAll = true;
      this.unmuteAll = false;
    },
    exitRoom() {
      this.$confirm({
        message: "Are you sure you want to exit this class?",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            location.href = "/";
          }
        },
      });
    },
    handleFS(id) {
      let videoPlayer = document.getElementById(id);
      videoPlayer.addEventListener("fullscreenchange", (e) => {
        if (videoPlayer.controls) return;
        let fullscreenElement = document.fullscreenElement;
        if (!fullscreenElement) {
          videoPlayer.style.pointerEvents = "auto";
          this.isVideoOnFullScreen = false;
        }
      });
      videoPlayer.addEventListener("webkitfullscreenchange", (e) => {
        if (videoPlayer.controls) return;
        let webkitIsFullScreen = document.webkitIsFullScreen;
        if (!webkitIsFullScreen) {
          videoPlayer.style.pointerEvents = "auto";
          this.isVideoOnFullScreen = false;
        }
      });
      videoPlayer.addEventListener("click", (e) => {
        if (videoPlayer.controls) return;
        if (!this.isVideoOnFullScreen) {
          if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
          } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
          } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
          }
          this.isVideoOnFullScreen = true;
          videoPlayer.style.pointerEvents = "none";
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          this.isVideoOnFullScreen = false;
          videoPlayer.style.pointerEvents = "auto";
        }
      });
    },
  },
};
</script>

<style>
</style>