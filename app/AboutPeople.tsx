import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const talentDisciplines = [
  "AI development",
  "Engineering",
  "Transformation",
  "Integration",
  "Implementation",
] as const;

const talentVisuals = [
  ["/media/clarity-diagnose-3d-v1.jpg", "Find the expertise a transformation needs"],
  ["/media/clarity-integrate-3d-v1.jpg", "Embed specialists within the team and its systems"],
  ["/media/clarity-scale-3d-v1.jpg", "Transfer capability so progress continues internally"],
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
              Not every organization needs to outsource its AI journey. Sometimes the right move is to bring proven
              expertise inside.
            </p>
            <p>
              OneBonsai Gulf connects organizations with carefully selected AI specialists and subject matter experts
              who can join a team, support a defined project, or help lead a wider transformation.
            </p>
          </div>
          <ul className="talent-disciplines" aria-label="AI talent disciplines">
            {talentDisciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}
          </ul>
          <p className="talent-closing">You know where you want to go. We help you find the people who can get you there.</p>
        </div>

        <div className="talent-visuals" aria-label="From expertise to embedded capability">
          {talentVisuals.map(([src, caption], index) => (
            <figure key={src} className={`talent-visual talent-visual-${index + 1}`}>
              <Image
                src={publicAsset(src)}
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 760px) 82vw, (max-width: 1200px) 42vw, 30vw"
                unoptimized
              />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="founder-section section-pad" aria-labelledby="founder-title">
        <figure className="founder-portrait">
          <Image
            src={publicAsset("/team/ivan-founder-office.jpg")}
            alt="Ivan M Grey, founder and CEO of OneBonsai Gulf, in Abu Dhabi"
            fill
            loading="lazy"
            sizes="(max-width: 760px) calc(100vw - 64px), 48vw"
            unoptimized
          />
          <figcaption>
            <strong>Ivan M Grey</strong>
            <span>Founder and CEO</span>
          </figcaption>
        </figure>

        <article className="founder-story">
          <p className="section-kicker">A note from our founder</p>
          <h2 id="founder-title">“The world does not need more conversations about AI. It needs companies that know how to turn AI into results.”</h2>
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
            <li>Save time</li>
            <li>Improve decisions</li>
            <li>Create revenue</li>
            <li>Give people more capability</li>
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
