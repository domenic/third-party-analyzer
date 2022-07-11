import puppeteer from "puppeteer";
import { getThirdPartyRequests, requestsToScriptDomains } from "./scraper.mjs";

const target = getTarget();
const browser = await puppeteer.launch();

const requests = await getThirdPartyRequests(browser, target);
const thirdPartyScriptDomains = requestsToScriptDomains(requests);

await browser.close();

// TODO: it'd be kind of cool if these streamed instead of buffering.
for (const domain of thirdPartyScriptDomains) {
  console.log(domain);
}

function getTarget() {
  const target = process.argv[2];

  if (!target) {
    console.error("Pass the target URL as an argument.");
    process.exit(1);
  }

  try {
    new URL(target);
  } catch {
    console.error(`Invalid target URL "${target}".`);
    process.exit(1);
  }

  return target;
}
