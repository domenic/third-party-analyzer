import puppeteer from "puppeteer";
import PublicSuffixList from "publicsuffixlist";

const browser = await puppeteer.launch();

const psl = new PublicSuffixList();
psl.initializeSync();

export async function getThirdPartyRequests(startingURL) {
  const startingURLDomain = getDomain(startingURL);
  const thirdPartyRequests = [];

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", request => {
    const url = request.url();
    if (getDomain(url) !== startingURLDomain) {
      // resourceType() returns the lowercase of:
      // https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-ResourceType
      thirdPartyRequests.push({ url, type: request.resourceType() });
    }

    request.continue();
  });

  await page.goto(startingURL);

  await browser.close();

  return thirdPartyRequests;
}

export function requestsToScriptDomains(requests) {
  return [...new Set(requests.filter(r => r.type === "script").map(r => (new URL(r.url)).hostname))];
}


function getDomain(urlString) {
  return psl.domain((new URL(urlString)).hostname);
}
