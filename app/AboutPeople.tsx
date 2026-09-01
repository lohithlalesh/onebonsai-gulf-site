import Image from "next/image";
import { ArrowsClockwise } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { Brain } from "@phosphor-icons/react/dist/ssr/Brain";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { ClockCountdown } from "@phosphor-icons/react/dist/ssr/ClockCountdown";
import { Code } from "@phosphor-icons/react/dist/ssr/Code";
import { CurrencyDollar } from "@phosphor-icons/react/dist/ssr/CurrencyDollar";
import { PlugsConnected } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { UsersThree } from "@phosphor-icons/react/dist/ssr/UsersThree";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const talentDisciplines = [
  ["AI development", Brain],
  ["Engineering", Code],
  ["Transformation", ArrowsClockwise],
  ["Integration", PlugsConnected],
  ["Implementation", CheckCircle],
] as const;

const founderOutcomes = [
  ["Save time", ClockCountdown],
  ["Improve decisions", ChartLineUp],
  ["Create revenue", CurrencyDollar],
  ["Give people more capability", UsersThree],
] as const;

export default function AboutPeople() {
  return (
    <>
      <section className="talent-section section-pad" aria-labelledby="talent-title">
        <div className="talent-copy">
          <p className="section-kicker">AI talent &amp; expertise</p>
          <h2 id="talent-title">The right AI transformation starts with the right people.</h2>
          <div className="talent-summary">
            <p>
              Sometimes the strongest AI capability belongs inside the organization. We place carefully selected AI
              specialists and subject matter experts where the work happens.
            </p>
            <p>
              They can join a team, support a defined project, or lead a wider transformation from planning through
              implementation.
            </p>
            <p className="talent-closing">You set the direction. We help you bring in the people who can deliver it.</p>
          </div>
          <ul className="talent-disciplines" aria-label="AI talent disciplines">
            {talentDisciplines.map(([discipline, Icon]) => (
              <li className="mechanical-reveal" key={discipline}>
                <Icon size={28} weight="thin" aria-hidden="true" />
                <span>{discipline}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

      <section className="founder-section section-pad" aria-labelledby="founder-title">
        <figure className="founder-portrait mechanical-reveal">
          <div className="founder-portrait-media">
            <Image
              src={publicAsset("/team/ivan-founder-office.jpg")}
              alt="Ivan M Grey, founder and CEO of OneBonsai Gulf, in Abu Dhabi"
              fill
              loading="lazy"
              sizes="(max-width: 760px) calc(100vw - 64px), 48vw"
              unoptimized
            />
          </div>
          <figcaption>
            <strong>Ivan M Grey</strong>
            <span>Founder and CEO</span>
          </figcaption>
        </figure>

        <article className="founder-story">
          <p className="section-kicker">A note from our founder</p>
          <h2 id="founder-title">
            <span>“The world does not need more conversations about AI.</span>
            <span>It needs companies that know how to turn AI into results.”</span>
          </h2>
          <div className="founder-story-copy">
            <p>
              That is why we built OneBonsai Gulf in Abu Dhabi: to move organizations from ambition and
              experimentation into working systems.
            </p>
            <p>
              We build on years of DeepTech delivery from our Belgian sister company, combining proven engineering
              with local strategy, integration, and implementation.
            </p>
          </div>
          <ul className="founder-outcomes" aria-label="The outcomes we build AI for">
            {founderOutcomes.map(([outcome, Icon]) => (
              <li className="mechanical-reveal" key={outcome}>
                <Icon size={28} weight="thin" aria-hidden="true" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
          <p className="founder-ambition">
            Our ambition is to become one of the region&apos;s most trusted AI transformation companies, built in Abu
            Dhabi and able to compete globally. We are only getting started.
          </p>
        </article>
      </section>
    </>
  );
}
