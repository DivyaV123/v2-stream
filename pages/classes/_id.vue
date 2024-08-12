<template>
  <div class="flex overflow-x-hidden">
    <div v-if="$fetchState.pending">
      <button class="btn btn-lg loading flex">
        Class is loading, please wait....
      </button>
    </div>
    <div v-else-if="error.length > 0">
      <div class="flex">
        <button class="btn btn-error">{{ error }}</button>
      </div>
    </div>
    <div v-else-if="reconnectAttempt">
      <div class="flex">
        <button class="btn btn-lg loading">
          You have lost internet, trying to reconnect.
        </button>
      </div>
    </div>
    <div v-else class="flex-1">
      <div v-if="joinRoomButton" id="join">
        <div class="flex flex-col items-center justify-center text-center">
          <div class="text-xl">Ready to join the class?</div>
          <div>
           <!-- <a v-if="$store.state.auth.user.id===7 ||  batch.trainer===7" :href="`https://demo.qspiders.com/`">
            <button
              :disabled="joinLoading"
              :class="joinLoading ? 'loading' : ''"
              class="btn btn-primary"
              @click="joinRoom"
            >
              <span v-if="joinLoading">Please wait, loading ...</span>
              <span v-else>Join now</span>
            </button>
            </a> -->
            <button 
              :disabled="joinLoading"
              :class="joinLoading ? 'loading' : ''"
              class="btn btn-primary"
              @click="joinRoom"
            >
              <span v-if="joinLoading">Please wait, loading ...</span>
              <span v-else>Join now</span>
            </button>
          </div>
          <div class="text-sm text-error">
            Note: If you are frequently getting disconnected from classroom, it
            means your internet connection is having a problem or is unstable.
            Please look into it or try refreshing.
          </div>
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
        >
          <div
            v-if="userRole === 'student' && !trainerJoined"
            class="flex flex-col items-center justify-center text-center"
          >
            <div><font-awesome-icon icon="user-alt-slash" class="fa-4x" /></div>

            <div class="text-lg text-error">
              Trainer has not joined the classroom
            </div>
          </div>
          <div
            v-if="userRole === 'student' && trainerJoined"
            class="flex flex-col items-center justify-center text-center"
          >
            <div v-if="!trainerVideo">
              <font-awesome-icon icon="user-alt" class="fa-4x" />
            </div>
            <div v-if="!trainerVideo" class="text-lg text-info">
              Trainer has joined the classroom
            </div>
            <div v-if="!trainerVideo" class="text-lg text-error">
              Trainer has not shared his video/screen
            </div>
          </div>
          <div v-if="userRole === 'trainer'" class="h-video">
            <span class="text-xl underline">Active Speakers </span>
            <div class="flex flex-wrap flex-row overflow-auto">
              <div
                class="
                  bg-gray-100
                  border-indigo-600
                  dark:bg-gray-800
                  bg-opacity-95
                  border-opacity-60
                  |
                  p-2
                  border-solid
                  rounded-2xl
                  border-2
                  |
                  flex
                  justify-around
                  cursor-pointer
                  |
                  transition-colors
                  duration-500
                "
                v-for="(a, i) in harkProducers"
                :key="i"
              >
                <button
                  @click="muteUser(a.userID)"
                  class="btn btn-success btn-xs"
                >
                  <font-awesome-icon icon="microphone" />
                </button>
                <div class="flex flex-col justify-center">
                  <p
                    :class="
                      a.harkStream['speaking']
                        ? 'animate-bounce text-info'
                        : 'text-gray-600'
                    "
                    class="font-semibold ml-1"
                  >
                    {{ a.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="remoteAudios" class="hidden"></div>
      </div>
      <div v-if="!joinRoomButton" class="z-50 flex justify-center bg-base-200">
        <span v-if="enableMuteAll">
          <div
            :data-tip="
              muteAll ? 'Mute the whole class' : 'Un-Mute the whole class'
            "
            class="tooltip"
          >
            <button
              v-on="
                muteAll
                  ? {
                      click: () => {
                        muteRoom();
                        this.muteAll = false;
                      },
                    }
                  : {
                      click: () => {
                        unmuteRoom();
                        this.muteAll = true;
                      },
                    }
              "
              id="muteAll"
              class="btn btn-circle btn-sm m-1"
              :class="muteAll ? 'btn-success' : 'btn-error'"
            >
              <font-awesome-icon icon="users-slash" />
            </button>
          </div>
          <!-- <div
            v-if="unmuteAll"
            data-tip="Un-Mute the whole class"
            class="tooltip"
          >
            <button
              id="unmuteAll"
              class="btn btn-circle "
              @click="unmuteRoom"
            >
              <font-awesome-icon icon="users-slash" />
            </button>
          </div> -->
        </span>
        <span v-if="enableAudio">
          <div
            :data-tip="
              muteCurrentUser || (!trainerJoined && userRole === 'student')
                ? 'Trainer not joined / Audio disabled by trainer'
                : 'Turn on/off the microphone'
            "
            class="tooltip"
          >
            <button
              :disabled="
                startAudioProgress ||
                muteCurrentUser ||
                (!trainerJoined && userRole === 'student')
              "
              v-on="
                startAudioButton
                  ? {
                      click: () => {
                        enableMic();
                        startAudioButton = false;
                        startAudioProgress = true;
                      },
                    }
                  : {
                      click: () => {
                        disableMic();
                        startAudioButton = true;
                        startAudioProgress = true;
                      },
                    }
              "
              id="startAudioButton"
              class="btn btn-circle btn-sm m-1"
              :class="startAudioButton ? 'btn-error' : 'btn-success'"
            >
              <font-awesome-icon
                :icon="startAudioButton ? 'microphone-slash' : 'microphone'"
              />
            </button>
          </div>
          <!-- <div
            v-if="stopAudioButton"
            data-tip="Turn off the microphone"
            class="tooltip"
          >
            <div class="indicator">
              <div
                class="indicator-item badge"
                :class="producerScore < 5 ? 'text-error' : 'text-info'"
              >
                {{ producerScore }}
              </div>
              <button
                id="stopAudioButton"
                @click="disableMic"
                class="btn btn-circle btn-success"
              >
                <font-awesome-icon icon="microphone" />
              </button>
            </div>
          </div> -->
        </span>
        <span v-if="enableVideo">
          <div
            :data-tip="
              startVideoButton ? 'Turn on the camera' : 'Turn off the camera'
            "
            class="tooltip"
          >
            <button
              :disabled="startVideoProgress"
              id="startVideoButton"
              v-on="
                startVideoButton
                  ? {
                      click: () => {
                        enableWebcam();
                        startVideoButton = false;
                        startVideoProgress = true;
                      },
                    }
                  : {
                      click: () => {
                        disableWebcam();
                        startVideoButton = true;
                        startVideoProgress = true;
                      },
                    }
              "
              class="btn btn-circle btn-sm m-1"
              :class="startVideoButton ? 'btn-error' : 'btn-success'"
            >
              <font-awesome-icon
                :icon="startVideoButton ? 'video-slash' : 'video'"
              />
            </button>
          </div>
          <!-- <div
            v-if="stopVideoButton"
            data-tip="Turn off the camera"
            class="tooltip"
          >
            <button
              id="stopVideoButton"
              @click="disableWebcam"
              class="btn btn-circle btn-success"
            >
              <font-awesome-icon icon="video" />
            </button>
          </div> -->
        </span>
        <span v-if="enablePresent">
          <div data-tip="Turn on the presentation" class="tooltip">
            <button
              v-on="
                startScreenButton
                  ? {
                      click: () => {
                        enableShare();
                      },
                    }
                  : {
                      click: () => {
                        disableShare();
                      },
                    }
              "
              id="startScreenButton"
              class="btn btn-circle btn-sm m-1"
              :class="startScreenButton ? 'btn-error' : 'btn-success'"
            >
              <font-awesome-icon icon="upload" />
            </button>
          </div>
          <!-- <div
            v-if="stopScreenButton"
            data-tip="Turn off the presentation"
            class="tooltip"
          >
            <button
              id="stopScreenButton"
              @click="disableShare"
              class="btn btn-circle btn-success"
            >
              <font-awesome-icon icon="upload" />
            </button>
          </div> -->
        </span>
        <div v-if="enableChatSidebar" class="indicator">
          <div
            v-if="newMessage"
            class="indicator-item badge animate-pulse bg-success"
          ></div>
          <div
            :data-tip="
              sidebarChat ? 'Close message board' : 'Open message board'
            "
            class="tooltip"
          >
            <button
              class="btn btn-circle btn-info btn-sm m-1"
              @click="
                sidebarChat = !sidebarChat;
                newMessage = false;
              "
            >
              <font-awesome-icon icon="comment-alt" />
            </button>
          </div>
        </div>
        <div v-if="exitButton" data-tip="Exit class" class="tooltip">
          <button
            id="exitButton"
            @click="exitRoom"
            class="btn btn-circle btn-error btn-sm m-1"
          >
            <font-awesome-icon icon="sign-out-alt" class="" />
          </button>
        </div>
      </div>
    </div>
    <aside
      :class="sidebarChat ? 'visible w-2/4 md:w-1/3 lg:w-1/3' : 'invisible w-0'"
      class="
        h-almost
        flex-shrink-0 flex flex-col
        border-r
        transition-all
        duration-300
        bg-base-200
      "
    >
      <RoomChat
        @message="setNewMessage"
        :roomName="roomName"
        :role="userRole"
        :users="users"
        @messageUser="messageUser"
        @onMuteUser="muteUser"
        @onUnmuteUser="unmuteUser"
        @closeChat="sidebarChat = false"
      />
    </aside>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import * as mediasoupClient from "mediasoup-client";
import hark from "hark";
import Bowser from "bowser";
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
const browser = Bowser.getParser(window.navigator.userAgent);
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
      startAudioProgress: false,
      stopAudioButton: false,
      startVideoButton: false,
      startVideoProgress: false,
      stopVideoButton: false,
      startScreenButton: false,
      startScreenProgress: false,
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
      _forceH264: false,
      _forceVP9: false,
      _useSimulcast: true,
      _useSharingSimulcast: false,
      newMessage: false,
      batch: {},
      singlestu: {},
      error: "",
      webrtcSocket: null,
      chatSocket: null,
      users: [],
      consumerTransport: null,
      webrtcParams: null,
      trainerJoined: false,
      trainerAudio: false,
      trainerVideo: false,
      joinLoading: false,
      producerScore: 10,
      activeSpeakers: [],
      muteCurrentUser: false,
      isOnline: true,
      reconnectAttempt: false,
      socketStatus: {},
      dcedMic: false,
      dcedVideo: false,
      dcedShare: false,
      audioPause: false,
      harkProducers: [],
      platform: null,
    };
  },
  async fetch() {
    let allow = false;
    try {
      let serverName = "ss3";
      const batch = await this.$axios.get(
        "batches/get-single-batch/?meeting_id=" + this.$route.params.id
      );      
      localStorage.setItem("batchcode", JSON.stringify(batch.data.results[0].meeting_id));
      const single = await this.$axios.get(
        "batches/get-single-batch-students/?meeting_id=" + this.$route.params.id
      );
      this.singlestu = single.data.results[0];

      if (batch.data.total > 0) {
        allow = true;
        this.batch = batch.data.results[0];
        if (this.batch.server_name) {
          serverName = this.batch.server_name;
        }
        if (this.batch.status == 2) {
          allow = false;
          this.error = "Batch is closed!";
        }
        if (this.joinRoomButton) {
          this.webrtcSocket = this.$nuxtSocket({
            name: serverName,
            transports: ["websocket"],
            reconnection: true,
            teardown: false,
            // persist: true,
          });
        }
        this.socketActions();
        this.platform = browser.getPlatform();
        if (this.platform.vendor !== "Apple") {
          if (Notification.permission !== "denied") {
            Notification.requestPermission();
          }
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

            // navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          }
          if (this.$store.state.auth.user.groups[i].name === "student") {
            this.userRole = "student";
            this.enableAudio = true;
            this.startAudioButton = true;
            // navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          }
          if (this.platform.type === "mobile") {
            this.enableAudio = false;
          }
        }

        if (this.userRole === "student" && !this.singlestu) {
          // this.error = "You don't have permission to attend the session!";
          let addAtt = await this.$axios.post("batches/add-batch-attendance/", {
            bid: this.batch.id,
            uid: this.$store.state.auth.user.id,
            role: this.userRole,
          });
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
            // socket.auth = {
            //   username: this.$store.state.auth.user.name,
            //   userID: this.$store.state.auth.user.id,
            //   role: this.userRole,
            // };
            // socket.connect();
            // socket1.auth = {
            //   sessionID: this.$store.state.auth.user.id,
            //   username: this.$store.state.auth.user.name,
            //   userID: this.$store.state.auth.user.id,
            //   roomID: this.roomName,
            //   role: this.userRole,
            // };
            // socket1.connect();

            // this.socketActions();
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
          // socket.auth = {
          //   username: this.$store.state.auth.user.name,
          //   userID: this.$store.state.auth.user.id,
          //   role: this.userRole,
          // };
          // socket.connect();
          // socket1.auth = {
          //   sessionID: this.$store.state.auth.user.id,
          //   username: this.$store.state.auth.user.name,
          //   userID: this.$store.state.auth.user.id,
          //   roomID: this.roomName,
          //   role: this.userRole,
          // };
          // socket1.connect();
          // this.socketActions();
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
    messageUser(message) {
      this.webrtcSocket.emit("newMessage", message);
    },
    socketActions() {
      // this.webrtcSocket.on("session", ({ sessionID, userID }) => {
      //   socket.auth = { sessionID };
      //   localStorage.setItem("sessionID", sessionID);
      //   socket.userID = userID;
      // });
      this.webrtcSocket.on("connect", async () => {
        if (!this.joinRoomButton && this.reconnectAttempt) {
          // await this.$fetch();
          // await this.joinRoom();
          // this.sidebarChat = true;
          this.reconnectAttempt = false;
          // await this.createSendTransport();
          // await this.createRecieveTransport();
          location.reload();

          // if (this.dcedMic) {
          //   await this.enableMic();
          // }
          // if (this.dcedVideo) {
          //   await this.enableWebcam();
          // }
          // await this.enableShare();
        }
      });
      this.webrtcSocket.on("muteUser", async () => {
        this.disableMic();
        this.startAudioButton = false;
        this.muteCurrentUser = true;
        this.startAudioProgress = false;
      });
      this.webrtcSocket.on("unmuteUser", async () => {
        this.muteCurrentUser = false;
        this.startAudioButton = true;
        this.startAudioProgress = false;
      });

      this.webrtcSocket.on("producerScore", ({ score }) => {
        this.producerScore = score;
      });
      this.webrtcSocket.on("newMessage", ({ content, date, from, to }) => {
        for (var i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          if (user.userID == from) {
            if (this.platform.vendor !== "Apple") {
              var notification = new Notification(user.name, {
                body: content,
                silent: true,
              });
              setTimeout(notification.close.bind(notification), 2500);
            }
            user.messages.push({
              content,
              date,
              from,
            });
            // let newUser = this.users[i];
            user.hasNewMessages = true;
            this.users.splice(i, 1);
            this.users.unshift(user);
            this.setNewMessage(true);
            break;
          }
        }
      });
      this.webrtcSocket.on("dupMessage", ({ content, date, from, to }) => {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].userID == to) {
            this.users[i].messages.push({
              content,
              date,
              from,
            });
            break;
          }
        }
      });
      this.webrtcSocket.on("newUser", (data) => {
        let found = false;
        if (data.role === "trainer") {
          this.trainerJoined = true;
        }
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].userID == data.userID) {
            this.users[i].connected = true;
            found = true;
            break;
          }
        }
        if (!found) {
          this.users.push(data);
          this.$store.dispatch("alerts/alert", {
            text: `New user connected ${data.name}`,
            type: "info",
          });
        }
      });
      this.webrtcSocket.on("userDisconnected", (data) => {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].userID == data.userID) {
            if (this.users[i].role === "trainer") {
              this.$store.dispatch("alerts/alert", {
                text: `Trainer has left the Classroom`,
                type: "info",
              });
              this.trainerJoined = false;
            }
            this.users[i].connected = false;
            for (var p = 0; p < this.harkProducers.length; p++) {
              if (this.harkProducers[p].userID === data.userID) {
                this.harkProducers.splice(p, 1);
              }
            }
          }
        }
      });
      this.webrtcSocket.on("muteRoom", async () => {
        await this.disableMic();
        this.enableAudio = false;
        this.startAudioButton = false;
        this.startAudioProgress = false;
        this.$store.dispatch("alerts/alert", {
          text: `Trainer has muted the Classroom`,
          type: "info",
        });
      });
      this.webrtcSocket.on("unmuteRoom", () => {
        if (this.platform.type !== "mobile") {
          this.enableAudio = true;
        }
        this.startAudioButton = true;
        this.startAudioProgress = false;
        this.$store.dispatch("alerts/alert", {
          text: `Trainer has un-muted the Classroom`,
          type: "info",
        });
      });
      this.webrtcSocket.on("new-producer", (data) =>
        this.connectRecvTransport(data.producerId, data.name, data.userID)
      );
      this.webrtcSocket.on("producer-closed", async ({ remoteProducerId }) => {
        // server notification is received when a producer is closed
        // we need to close the client-side consumer and associated transport
        try {
          const producerToClose = this.consumerTransports.find(
            (transportData) => transportData.producerId === remoteProducerId
          );
          // producerToClose.consumerTransport.close();
          // producerToClose.consumer.close();
          // remove the consumer transport from the list
          this.consumerTransports = this.consumerTransports.filter(
            (transportData) => transportData.producerId !== remoteProducerId
          );
          // let elem = document.getElementById(remoteProducerId);
          // elem.parentNode.removeChild(elem);
          if (producerToClose && producerToClose.kind === "video") {
            if (document.getElementsByTagName("video").length <= 0) {
              this.trainerVideo = false;
            }
          }
          for (var p = 0; p < this.harkProducers.length; p++) {
            if (
              this.harkProducers[p].producerId ===
              remoteProducerId.substring(0, 5)
            ) {
              this.harkProducers[p].harkStream.stop();
              this.harkProducers.splice(p, 1);
            }
          }
          if (document.getElementById(remoteProducerId.substring(0, 5))) {
            document.getElementById(remoteProducerId.substring(0, 5)).remove();
          } else {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            document.getElementById(remoteProducerId.substring(0, 5)).remove();
          }
        } catch (err) {
          console.log("producer not found", err);
        }
      });
      this.webrtcSocket.on("disconnect", async () => {
        this.reconnectAttempt = true;
        console.log("Socket disconnected");
        // if (!this.joinRoomButton) {
        //   if (this._micProducer) {
        //     this.dcedMic = true;
        //     await this.disableMic();
        //   }
        //   if (this._webcamProducer) {
        //     this.dcedVideo = true;
        //     await this.disableWebcam();
        //   }
        //   this.sidebarChat = false;
        // if (this._shareProducer) {
        //   this.dcedShare = true;
        //   await this.disableShare();
        // }
        // }
        // location.reload();
      });
    },
    getProducers() {
      this.webrtcSocket.emit("getProducers", (producers) => {
        // for each of the producer create a consumer
        producers.forEach((producer) =>
          this.connectRecvTransport(
            producer.producerId,
            producer.name,
            producer.userID
          )
        );
        // producerIds.forEach(this.signalNewConsumerTransport)
      });
    },
    checkPermissions() {
      this.joinLoading = true;
      let constraints = { audio: true, video: true };
      if (this.userRole === "student") {
        constraints = { audio: true, video: false };
      }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          // stream.forEach(function (track) {
          //   track.stop();
          // });
          this.joinRoom();
        })
        .catch((err) => {
          // const browser = Bowser.getParser(window.navigator.userAgent);
          const browserName = browser.getBrowserName();

          const errName = err.name;
          const errMessage = err.message;
          let errorType =
            "Please check camera and microphone settings in your browser";
          if (browserName === "Chrome") {
            if (errName === "NotAllowedError") {
              if (errMessage === "Permission denied by system") {
                errorType =
                  "Please check camera and microphone settings in your OS";
              } else if (errMessage === "Permission denied") {
                errorType =
                  "Please enable camera and microphone permission in your browser settings";
              }
            } else if (errName === "NotReadableError") {
              errorType =
                "Camera and microphone are not accessible, please check your settings";
            }
          } else if (browserName === "Safari") {
            if (errName === "NotAllowedError") {
              errorType =
                "Please enable camera and microphone permission in your browser settings";
            }
          } else if (browserName === "Microsoft Edge") {
            if (errName === "NotAllowedError") {
              errorType =
                "Please enable camera and microphone permission in your browser settings";
            } else if (errName === "NotReadableError") {
              errorType =
                "Camera and microphone are not accessible, please check your settings";
            }
          } else if (browserName === "Firefox") {
            // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#exceptions
            if (errName === "NotFoundError") {
              errorType =
                "Please check camera and microphone settings in your OS";
            } else if (errName === "NotReadableError") {
              errorType =
                "Camera and microphone are not accessible, please check your settings";
            } else if (errName === "NotAllowedError") {
              errorType =
                "Please enable camera and microphone permission in your browser settings";
            } else if (errName === "AbortError") {
              errorType =
                "Camera and microphone are not accessible, please check your settings";
            }
          } else {
            errorType =
              "Browser not supported, Please use the latest version of Chrome, Edge or Firefox";
          }

          this.$store.dispatch("alerts/alert", {
            text: `${errName}: ${errorType}`,
            type: "error",
          });
          this.joinLoading = false;
        });
    },
    async restartICE() {},
    joinRoom() {
      // stream.forEach(function (track) {
      //   track.stop();
      // });
      this.joinRoomButton = false;
      let roomName = this.roomName;
      let userID = this.$store.state.auth.user.id;
      let username = this.$store.state.auth.user.name;
      let role = this.userRole;
      this.sidebarChat = true;
      this.webrtcSocket.emit(
        "joinRoom",
        { roomName, userID, username, role },
        (data) => {
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
          if (data.userMuted) {
            this.muteCurrentUser = true;
            this.$store.dispatch("alerts/alert", {
              text: `Trainer has muted you!`,
              type: "info",
            });
          }
          // once we have rtpCapabilities from the Router, create Device
          this.createDevice();
          this.getRoomUsers();
        }
      );
    },
    async getRoomUsers() {
      let roomName = this.roomName;
      let role = this.userRole;
      this.webrtcSocket.emit("roomUsers", { roomName, role }, (data) => {
        data.users.forEach((element) => {
          let found = false;
          if (element.role === "trainer") {
            this.trainerJoined = true;
          }
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].userID == element.userID) {
              found = true;
            }
          }
          if (!found) {
            this.users.push(element);
          }
        });
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
        await this.createRecieveTransport();
      } catch (error) {
        console.log(error);
        if (error.name === "UnsupportedError")
          console.warn("browser not supported");
      }
    },
    createSendTransport() {
      this.webrtcSocket.emit(
        "createWebRtcTransport",
        { consumer: false },
        ({ params }) => {
          if (params.error) {
            console.log(params.error);
            return;
          }
          params.proprietaryConstraints = PC_PROPRIETARY_CONSTRAINTS;
          this.producerTransport = this.device.createSendTransport(params);

          this.producerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await this.webrtcSocket.emit("transport-connect", {
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
                await this.webrtcSocket.emit(
                  "transport-produce",
                  {
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                  },
                  ({ id, producersExist }) => {
                    callback({ id });
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
    async resumeAudio() {
      if (this._micProducer) {
        await this._micProducer.resume();
        this.startAudioButton = false;
        this.stopAudioButton = true;
        this.startAudioProgress = false;
        this.webrtcSocket.emit("producer-resume", {
          producerId: this._micProducer.id,
        });
      }
    },
    async pauseAudio() {
      if (this._micProducer) {
        await this._micProducer.pause();
        this.startAudioButton = true;
        this.stopAudioButton = false;
        this.startAudioProgress = false;
        this.webrtcSocket.emit("producer-pause", {
          producerId: this._micProducer.id,
        });
      }
    },
    async enableMic() {
      if (this._micProducer) {
        if (this.userRole === "trainer") {
          await this.resumeAudio();
        }
        return;
      }

      if (!this.device.canProduce("audio")) {
        console.log("enableMic() | cannot produce audio");
        return;
      }
      this.startAudioProgress = true;
      // let roomName = this.roomName;
      // this.webrtcSocket.emit("check audio", { roomName }, (data) => {
      //   if (this.userRole === "student") {
      //     if (data.muted) {
      //       this.$store.dispatch("alerts/alert", {
      //         text: `Trainer has muted the room!`,
      //         type: "error",
      //       });
      //       return;
      //     }
      //   }
      // });
      try {
        // var audioContext = new AudioContext();
        // var gainNode = audioContext.createGain();
        // var biquadFilter = audioContext.createBiquadFilter();
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 96000,
            channelCount: 1,
            volume: 1.0,
            sampleSize: 16,
            echoCancellation: true,
            noiseSuppression: true,
            createGain: false,
          },
        });
        // var audioSource = audioContext.createMediaStreamSource(stream);
        // var audioDestination = audioContext.createMediaStreamDestination();
        // biquadFilter.type = "lowshelf";
        // gainNode.gain.value = 0.9;
        // audioSource.connect(biquadFilter);
        // audioSource.connect(gainNode);
        // gainNode.connect(audioDestination);
        // var track = audioContext.createMediaStreamTrackSource(track);
        let track = stream.getAudioTracks()[0];
        // var track = audioDestination.stream.getAudioTracks()[0];
        this._micProducer = await this.producerTransport.produce({
          track,
          codecOptions: {
            // opusStereo: 1,
            opusFec: true,
            opusDtx: true,
            opusPtime: 20,
            opusMaxPlaybackRate: 96000,
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
        this.$store.dispatch("alerts/alert", {
          text: `You have started sharing your audio to the classroom`,
          type: "info",
        });
        this.startAudioProgress = false;
      } catch (error) {
        this.startAudioProgress = false;
        if (error.name === "NotAllowedError") {
          this.$store.dispatch("alerts/alert", {
            text: `You have disabled permission to access microphone, please allow/enable permission in your browser settings and refresh the page`,
            type: "error",
          });
        } else {
          this.$store.dispatch("alerts/alert", {
            text: `Error enabling microphone: ${error}`,
            type: "error",
          });
        }
        if (track) track.stop();
      }
    },
    async disableMic() {
      if (this._micProducer) {
        if (this.userRole === "trainer") {
          await this.pauseAudio();
          return;
        }
      }
      if (!this._micProducer) {
        this.startAudioProgress = false;
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        await this._micProducer.close();
        await this.webrtcSocket.emit("producer-close", {
          producerId: this._micProducer.id,
        });
        this.$store.dispatch("alerts/alert", {
          text: `You have stopped sharing your audio to the classroom`,
          type: "info",
        });
        this.startAudioProgress = false;
      } catch (error) {
        this.$store.dispatch("alerts/alert", {
          text: `Error closing Microphone from server side! ${error}`,
          type: "error",
        });
        this.startAudioProgress = false;
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

    // async connectSendTransport() {
    //   this.producer = await this.producerTransport.produce(this.params);

    //   this.producer.on("trackended", () => {
    //     // console.log('track ended')
    //     // close video track
    //   });

    //   this.producer.on("transportclose", () => {
    //     // console.log('transport ended')
    //     // close video track
    //   });
    // },
    async enableWebcam() {
      if (this._webcamProducer) {
        this.startVideoProgress = false;
        return;
      } else if (this._shareProducer) await this.disableShare();

      this.startVideoProgress = true;
      if (!this.device.canProduce("video")) {
        this.$store.dispatch("alerts/alert", {
          text: `This device cannot produce video!`,
          type: "error",
        });

        return;
      }

      try {
        let track;
        let device;
        await this.updateWebcams();
        device = this.webcamdevice;

        const { resolution } = this.webcam;

        if (!device) {
          // throw new Error("no webcam devices");
          this.$store.dispatch("alerts/alert", {
            text: `No webcam devices found!`,
            type: "error",
          });
          this.startVideoProgress = false;
          return;
        }

        // console.log("enableWebcam() | calling getUserMedia()");

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
        elem.muted = true;
        elem.volume = 0;
        elem.className = "vid";
        document.getElementById("localMedia").appendChild(elem);
        this.handleFS(elem.id);
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
        this.$store.dispatch("alerts/alert", {
          text: `You have started sharing your video to the classroom`,
          type: "info",
        });
        this.startVideoButton = false;
        this.stopVideoButton = true;
        this.startVideoProgress = false;
      } catch (error) {
        this.startVideoProgress = false;
        // console.log("enableWebcam() | failed:%o", error);
        if (error.name === "NotAllowedError") {
          this.$store.dispatch("alerts/alert", {
            text: `You have disabled permission to access camera, please allow/enable permission in your browser settings and refresh the page`,
            type: "error",
          });
        } else {
          this.$store.dispatch("alerts/alert", {
            text: `Error enabling webcam: ${error}`,
            type: "error",
          });
        }

        if (track) track.stop();
      }
    },
    async disableWebcam() {
      // console.log("disableWebcam()");

      if (!this._webcamProducer) {
        this.startVideoProgress = false;
        return;
      }
      try {
        await this._webcamProducer.close();
        await this.webrtcSocket.emit("producer-close", {
          producerId: this._webcamProducer.id,
        });
        this.$store.dispatch("alerts/alert", {
          text: `You have stopped sharing your video to the classroom`,
          type: "info",
        });
        this.startVideoButton = true;
        this.stopVideoButton = false;
        this.startVideoProgress = false;
      } catch (error) {
        this.$store.dispatch("alerts/alert", {
          text: `Error closing Video from server side! ${error}`,
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
      // console.log("enableShare()");

      if (this._shareProducer) {
        this.startScreenProgress = false;
        return;
      } else if (this._webcamProducer) await this.disableWebcam();
      this.startScreenProgress = true;
      if (!this.device.canProduce("video")) {
        this.$store.dispatch("alerts/alert", {
          text: `This device cannot produce screenshare!`,
          type: "error",
        });
        return;
      }

      let track;

      try {
        // console.log("enableShare() | calling getUserMedia()");

        const stream = await navigator.mediaDevices.getDisplayMedia({
          audio: false,
          video: true,
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
        this.handleFS(elem.id);

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
        this.$store.dispatch("alerts/alert", {
          text: `You have started presenting your screen to the classroom`,
          type: "info",
        });
        this.startScreenButton = false;
        this.stopScreenButton = true;
        this.startScreenProgress = false;
      } catch (error) {
        // console.log("enableShare() | failed:%o", error);
        this.startScreenProgress = false;
        if (error.name !== "NotAllowedError") {
          this.$store.dispatch("alerts/alert", {
            text: `Permission Denied for sharing screen, please enable permission: ${error}`,
            type: "error",
          });
        }

        if (track) track.stop();
      }
    },

    async disableShare() {
      if (!this._shareProducer) {
        this.startScreenProgress = false;
        return;
      }

      this._shareProducer.close();

      // this.event(_EVENTS.removeProducer, { producerId: this._shareProducer.id })

      try {
        await this.webrtcSocket.emit("producer-close", {
          producerId: this._shareProducer.id,
        });
        this.$store.dispatch("alerts/alert", {
          text: `You have stopped presenting your screen to the classroom`,
          type: "info",
        });
        this.startScreenButton = true;
        this.stopScreenButton = false;
        this.startScreenProgress = false;
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
    createRecieveTransport() {
      this.webrtcSocket.emit(
        "createWebRtcTransport",
        { consumer: true },
        ({ params }) => {
          // this.webrtcParams = params
          if (params.error) {
            console.log(params.error);
            return;
          }

          try {
            this.consumerTransport = this.device.createRecvTransport(params);
            this.getProducers();
          } catch (error) {
            console.log(error);
            return;
          }

          this.consumerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                // Signal local DTLS parameters to the server side transport
                // see server's this.webrtcSocket.on('transport-recv-connect', ...)
                await this.webrtcSocket.emit("transport-recv-connect", {
                  dtlsParameters,
                  serverConsumerTransportId: this.consumerTransport.id,
                });

                // Tell the transport that parameters were transmitted.
                callback();
              } catch (error) {
                // Tell the transport that something was wrong
                errback(error);
              }
            }
          );
        }
      );
    },

    async connectRecvTransport(remoteProducerId, name, userID) {
      // let consumerTransport = this.consumerTransport;
      let serverConsumerTransportId = this.consumerTransport.id;
      await this.webrtcSocket.emit(
        "consume",
        {
          rtpCapabilities: this.device.rtpCapabilities,
          remoteProducerId,
          serverConsumerTransportId,
        },
        async ({ params }) => {
          if (params.error) {
            console.log("Cannot Consume", params.error);
            return;
          }
          const consumer = await this.consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          this.consumerTransports = [
            ...this.consumerTransports,
            {
              consumerTransport: this.consumerTransport,
              serverConsumerTransportId: params.id,
              producerId: remoteProducerId,
              kind: params.kind,
              consumer,
            },
          ];

          // destructure and retrieve the video track from the producer
          const { track } = consumer;
          let elem;
          if (track.kind === "video") {
            this.trainerVideo = true;
            elem = document.createElement("video");
            elem.srcObject = new MediaStream([track]);
            elem.id = remoteProducerId.substring(0, 5);
            elem.playsinline = false;
            elem.autoplay = true;
            elem.muted = true;
            elem.volume = 0;
            elem.className =
              "h-full w-full absolute object-contain overflow-hidden";
            document.getElementById("remoteVideos").appendChild(elem);
            this.handleFS(elem.id);
          } else {
            elem = document.createElement("audio");
            elem.srcObject = new MediaStream([track]);
            elem.id = remoteProducerId.substring(0, 5);
            elem.playsinline = false;
            elem.volume = 0.9;
            elem.autoplay = true;
            document.getElementById("remoteAudios").appendChild(elem);
            if (this.userRole === "trainer") {
              var options = { threshold: -80 };
              let harkStream = hark(elem.srcObject, options);
              this.harkProducers.push({
                name: name,
                userID: userID,
                producerId: remoteProducerId.substring(0, 5),
                harkStream: harkStream,
              });
              // harkStream.on("speaking", function () {
              //   // console.log("speaking");
              // });
              // harkStream.on("stopped_speaking", function () {
              //   // console.log("not speaking");
              // });
            }
          }

          // the server consumer started with media paused
          // so we need to inform the server to resume
          this.webrtcSocket.emit("consumer-resume", {
            serverConsumerId: params.serverConsumerId,
          });
        }
      );
    },
    async muteRoom() {
      this.webrtcSocket.emit("muteRoom");
      this.muteAll = false;
      this.unmuteAll = true;
      await this.$store.dispatch("alerts/alert", {
        text: "You have muted the classroom",
        type: "info",
      });
    },
    async muteUser(userID) {
      if (this.userRole === "trainer") {
        this.webrtcSocket.emit("muteUser", { userID: userID });
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].userID == userID) {
            this.users[i].muted = true;
            break;
          }
        }
        // for (var p = 0; p < this.harkProducers.length; p++) {
        //   if (this.harkProducers[p].userID === userID) {
        //     this.harkProducers[p].harkStream.stop();
        //     this.harkProducers.splice(p, 1);
        //   }
        // }
      }
    },
    async unmuteUser(userID) {
      if (this.userRole === "trainer") {
        this.webrtcSocket.emit("unmuteUser", { userID: userID });
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].userID == userID) {
            this.users[i].muted = false;
            break;
          }
        }
      }
    },
    async unmuteRoom() {
      this.webrtcSocket.emit("unmuteRoom");
      this.muteAll = true;
      this.unmuteAll = false;
      await this.$store.dispatch("alerts/alert", {
        text: "You have un-muted the classroom",
        type: "info",
      });
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
  // async beforeRouteLeave(to, from, next) {
  //   if (confirm("Are you sure you want to exit the class?")) {
  //     location.reload();
  //     return next();
  //   } else {
  //     next(false);
  //     return;
  //   }
  // },
};
</script>

<style>
</style>