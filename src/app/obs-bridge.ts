import OBSWebSocket from "obs-websocket-js";

export class ObsBridge {
  private obs: OBSWebSocket;

  constructor() {
    this.obs = new OBSWebSocket();
    this.obs.connect();
  }

  async getScenes(): Promise<string[]> {
    const data = await this.obs.send("GetSceneList");
    return data.scenes.map((x) => x.name);
  }

  async changeScene(sceneName: string) {
    this.obs.send("SetCurrentScene", { "scene-name": sceneName });
  }
}
