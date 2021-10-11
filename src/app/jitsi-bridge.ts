import { ObsBridge } from "./obs-bridge";

declare namespace window {
  const APP: any;
  const JitsiMeetJS: any;
}

enum COMMANDS {
  GET_SCENES = "!scenes",
  CHANGE_SCENE = "!scene",
  HELP = '!commands',
}

const help = [{
  cmd: COMMANDS.GET_SCENES,
  text: 'List all scenes',
}, {
  cmd: COMMANDS.CHANGE_SCENE + ' <scene name>',
  text: 'Change scene to scene name',
}]

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
      case COMMANDS.HELP:
        const helpText = help.reduce((prev, current) => {
          return `${prev}\n${current.cmd}: ${current.text}`
        }, '')
        window.APP.conference._room.sendMessage(helpText);
        break;
      case COMMANDS.GET_SCENES:
        const scenes = await this.obs.getScenes();
        window.APP.conference._room.sendMessage(scenes.join("\n"));
        break;
      case COMMANDS.CHANGE_SCENE:
        msgParts.shift();
        this.obs.changeScene(msgParts.join(" "));
        break;
    }
  }
}
