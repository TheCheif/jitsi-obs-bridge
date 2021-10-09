import { JitsiBridge } from "./jitsi-bridge";
import { ObsBridge } from "./obs-bridge";

function main() {
  const obs = new ObsBridge();
  const jitsiBridge = new JitsiBridge(obs);

  setTimeout(() => {
    jitsiBridge.setup();
  }, 5000);
}

main()