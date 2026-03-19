// js/print.js

import { render as renderSummary} from "./summary.js";
import { render as renderCV} from "./cv.js";
import { render as renderMastery, init as initMastery} from "./mastery.js";
import { render as renderCommunication, init as initCommunication } from "./communication.js"
import { render as renderInquiry, init as initInquiry } from "./inquiry.js";

export function render(){
  return `
    <section class="print-section" id="print-summary">
      ${renderSummary()}
    </section>

    <section class="print-section" id="print-cv">
      ${renderCV()}
    </section>

    <section class="print-section" id="print-mastery">
      ${renderMastery()}
    </section>

    <section class="print-section" id="print-communication">
      ${renderCommunication()}
    </section>

    <section class="print-section" id="print-inquiry">
      ${renderInquiry()}
    </section>
  `;
}

export function init() {
    // initSummary?.();
    // initCV?.();
    initMastery?.();
    initCommunication?.();
    initInquiry?.();
}