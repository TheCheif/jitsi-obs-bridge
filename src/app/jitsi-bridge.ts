import { ObsBridge } from "./obs-bridge";

declare namespace window {
  const APP: any;
  const JitsiMeetJS: any;
}

enum COMMAND {
  GET_SCENES = "!scenes",
  CHANGE_SCENE = "!scene",
}

export class JitsiBridge {
  constructor(private obs: ObsBridge) {}

  setup() {
    window.APP.conference._room.on(
      window.JitsiMeetJS.events.conference.MESSAGE_RECEIVED,
      (id: string, msg: string) => {
        this.handleIncomingMessage(msg);
      }
    );
  }

  async handleIncomingMessage(msg: string) {
    const msgParts = msg.split(" ");
    switch (msgParts[0]) {
      case COMMAND.GET_SCENES:
        const scenes = await this.obs.getScenes();
        window.APP.conference._room.sendMessage(scenes.join("\n"));
        break;
      case COMMAND.CHANGE_SCENE:
        msgParts.shift();
        this.obs.changeScene(msgParts.join(" "));
        break;
    }
  }
}
