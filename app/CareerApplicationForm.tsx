"use client";

import { ArrowUpLeft } from "@phosphor-icons/react/dist/icons/ArrowUpLeft";
import { ArrowUpRight } from "@phosphor-icons/react/dist/icons/ArrowUpRight";
import { Check } from "@phosphor-icons/react/dist/icons/Check";
import { FilePdf } from "@phosphor-icons/react/dist/icons/FilePdf";
import { UploadSimple } from "@phosphor-icons/react/dist/icons/UploadSimple";
import { useMemo, useState, type DragEvent, type FormEvent } from "react";
import CareerTurnstile from "./CareerTurnstile";
import type { Locale } from "./locale";

type CareerApplicationFormProps = { locale: Locale };
type Phase = "introduction" | "review" | "quiz" | "upload" | "success";
type RequestState = "idle" | "submitting" | "error";
type QuizQuestion = {
  id: string;
  domain: string;
  prompt: string;
  choices: Array<{ id: string; label: string }>;
};

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const copy = {
  en: {
    formLabel: "Start your introduction",
    progress: "questions open",
    nameLabel: "First, what is your name?",
    namePlaceholder: "Your full name",
    nameHelper: "Use the name you would like us to call you.",
    nameError: "Please add at least two characters.",
    ageLabel: "How old are you?",
    agePlaceholder: "Start typing your age",
    notCollected: "Not collected",
    ageJoke: "JK. We don't care about your age.",
    ageFollowup: "Your judgement, curiosity, and ability to deliver matter more.",
    universityLabel: "Which university did you attend?",
    universityPlaceholder: "Start typing a university",
    universityJoke: "Same again. We don't care which university you attended.",
    universityFollowup: "A strong body of work can come from anywhere.",
    linkedinLabel: "Where can we find you on LinkedIn?",
    linkedinPlaceholder: "linkedin.com/in/your-profile",
    linkedinHelper: "Required. A personal LinkedIn profile works best.",
    linkedinError: "Add a valid LinkedIn profile URL.",
    workLabel: "Anything worth bragging about?",
    optional: "Optional",
    workPlaceholder: "Portfolio, GitHub, product, paper, or demo",
    workHelper: "One link is enough. Choose the work that best represents how you think.",
    workError: "Add a complete web link, or leave this field empty.",
    review: "Review my introduction",
    readyKicker: "Introduction ready",
    readyTitle: "That is enough to start a real conversation.",
    readyBody: "Check your links, complete the human check, then move into three practical AI questions. We only collect your name, LinkedIn profile, and the optional work link at this stage.",
    startCheck: "Test my AI fluency",
    starting: "Preparing your questions…",
    humanRequired: "Complete the human check to continue.",
    startError: "We could not start the fluency check. Please try again.",
    name: "Name",
    age: "Age",
    university: "University",
    linkedin: "LinkedIn",
    work: "Selected work",
    notUsed: "Not part of the application",
    notAdded: "No link added",
    edit: "Edit details",
    quizKicker: "AI fluency / 3 questions",
    quizTitle: "Good. Now show us how you think.",
    quizBody: "No obscure terminology. Choose the safest, most useful response to each situation.",
    submitAnswers: "Check my answers",
    checking: "Checking…",
    answerAll: "Choose one answer for each question.",
    quizError: "We could not check those answers. Please try again.",
    retryKicker: "One more pass",
    retryTitle: "A fresh set is ready.",
    retryBody: "You scored {score}/3. Take the reasoning, not the result, personally.",
    clearedKicker: "AI fluency cleared",
    clearedTitle: "3/3. You are in the sharp end of the applicant pool.",
    clearedBody: "One last thing: add the résumé that gives us useful context.",
    completeKicker: "Fluency check complete",
    completeTitle: "One signal is not the whole person.",
    completeBody: "You can still send your résumé. We review the complete application, not one quiz score.",
    resumeLabel: "Drop your résumé here",
    resumeHelp: "PDF only · maximum 5 MB · click or drag and drop",
    replace: "Choose a different PDF",
    consent: "I agree that OneBonsai Gulf may use this information to assess my application. Résumé links expire after 14 days and application files are retained for up to 90 days.",
    upload: "Send my application",
    uploading: "Securing your résumé…",
    resumeInvalid: "Choose a valid PDF of 5 MB or less.",
    uploadError: "We could not store the résumé. Please try again.",
    successKicker: "Application received",
    successTitle: "Your work is now in the right room.",
    successBody: "Your résumé is stored privately. If there is a strong fit, the team will continue the conversation through LinkedIn.",
  },
  ar: {
    formLabel: "ابدأ التعارف",
    progress: "أسئلة متاحة",
    nameLabel: "بدايةً، ما اسمك؟",
    namePlaceholder: "اسمك الكامل",
    nameHelper: "اكتب الاسم الذي تفضّل أن نناديك به.",
    nameError: "يرجى كتابة حرفين على الأقل.",
    ageLabel: "كم عمرك؟",
    agePlaceholder: "ابدأ بكتابة عمرك",
    notCollected: "لا نجمع هذه المعلومة",
    ageJoke: "نمزح. لا يهمنا عمرك.",
    ageFollowup: "ما يهمنا هو حسن تقديرك وفضولك وقدرتك على الإنجاز.",
    universityLabel: "في أي جامعة درست؟",
    universityPlaceholder: "ابدأ بكتابة اسم الجامعة",
    universityJoke: "ونكررها. لا يهمنا اسم الجامعة أيضاً.",
    universityFollowup: "العمل القوي قد يأتي من أي مكان.",
    linkedinLabel: "أين يمكننا العثور عليك في LinkedIn؟",
    linkedinPlaceholder: "linkedin.com/in/your-profile",
    linkedinHelper: "مطلوب. يفضّل إضافة رابط ملفك الشخصي.",
    linkedinError: "أضف رابطاً صحيحاً لملفك على LinkedIn.",
    workLabel: "هل لديك عمل يستحق التباهي؟",
    optional: "اختياري",
    workPlaceholder: "ملف أعمال أو GitHub أو منتج أو بحث أو عرض",
    workHelper: "رابط واحد يكفي. اختر العمل الذي يعبّر عن طريقة تفكيرك.",
    workError: "أضف رابط ويب كاملاً أو اترك الحقل فارغاً.",
    review: "مراجعة نبذتي",
    readyKicker: "نبذتك جاهزة",
    readyTitle: "هذا يكفي لبدء حوار حقيقي.",
    readyBody: "راجع الروابط وأكمل التحقق البشري، ثم انتقل إلى ثلاثة أسئلة عملية عن الذكاء الاصطناعي. في هذه المرحلة نجمع اسمك وملفك على LinkedIn ورابط العمل الاختياري فقط.",
    startCheck: "اختبار طلاقتي في الذكاء الاصطناعي",
    starting: "نجهّز أسئلتك…",
    humanRequired: "أكمل التحقق البشري للمتابعة.",
    startError: "تعذّر بدء اختبار الطلاقة. حاول مجدداً.",
    name: "الاسم",
    age: "العمر",
    university: "الجامعة",
    linkedin: "LinkedIn",
    work: "عمل مختار",
    notUsed: "ليست جزءاً من الطلب",
    notAdded: "لم تتم إضافة رابط",
    edit: "تعديل التفاصيل",
    quizKicker: "طلاقة الذكاء الاصطناعي / 3 أسئلة",
    quizTitle: "جميل. أرِنا الآن كيف تفكّر.",
    quizBody: "لا مصطلحات غامضة. اختر الاستجابة الأكثر أماناً وفائدة في كل موقف.",
    submitAnswers: "تحقق من إجاباتي",
    checking: "جارٍ التحقق…",
    answerAll: "اختر إجابة واحدة لكل سؤال.",
    quizError: "تعذّر التحقق من الإجابات. حاول مجدداً.",
    retryKicker: "محاولة أخيرة",
    retryTitle: "جهّزنا لك مجموعة جديدة.",
    retryBody: "نتيجتك {score}/3. خذ المنطق بجدية، لا النتيجة.",
    clearedKicker: "اجتزت اختبار الطلاقة",
    clearedTitle: "3/3. أنت ضمن الفئة الأبرز من المتقدمين.",
    clearedBody: "خطوة أخيرة: أضف سيرتك الذاتية لتمنحنا سياقاً مفيداً.",
    completeKicker: "اكتمل اختبار الطلاقة",
    completeTitle: "هذه إشارة واحدة وليست الصورة الكاملة.",
    completeBody: "ما زال بإمكانك إرسال سيرتك الذاتية. نراجع الطلب كاملاً، لا نتيجة اختبار واحدة.",
    resumeLabel: "ضع سيرتك الذاتية هنا",
    resumeHelp: "PDF فقط · بحد أقصى 5 ميغابايت · انقر أو اسحب الملف وأفلته",
    replace: "اختيار ملف PDF آخر",
    consent: "أوافق على استخدام OneBonsai Gulf لهذه المعلومات لتقييم طلبي. تنتهي صلاحية رابط السيرة الذاتية بعد 14 يوماً، ويُحتفظ بملفات الطلب لمدة لا تتجاوز 90 يوماً.",
    upload: "إرسال طلبي",
    uploading: "نؤمّن سيرتك الذاتية…",
    resumeInvalid: "اختر ملف PDF صالحاً بحجم 5 ميغابايت أو أقل.",
    uploadError: "تعذّر حفظ السيرة الذاتية. حاول مجدداً.",
    successKicker: "تم استلام الطلب",
    successTitle: "وصل عملك إلى المكان المناسب.",
    successBody: "حُفظت سيرتك الذاتية بشكل خاص. إذا وجدنا توافقاً قوياً، فسيواصل الفريق الحوار معك عبر LinkedIn.",
  },
} as const;

function parseWebUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
}

function isLinkedInUrl(value: string) {
  const url = parseWebUrl(value);
  return Boolean(url && /(^|\.)linkedin\.com$/i.test(url.hostname));
}

async function responseJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

export default function CareerApplicationForm({ locale }: CareerApplicationFormProps) {
  const t = copy[locale];
  const isArabic = locale === "ar";
  const DirectionIcon = isArabic ? ArrowUpLeft : ArrowUpRight;
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [ageAnswered, setAgeAnswered] = useState(false);
  const [universityAnswered, setUniversityAnswered] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [linkedinTouched, setLinkedinTouched] = useState(false);
  const [work, setWork] = useState("");
  const [workTouched, setWorkTouched] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [phase, setPhase] = useState<Phase>("introduction");
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [requestError, setRequestError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [retryScore, setRetryScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);
  const [uploadToken, setUploadToken] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [consent, setConsent] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const nameValid = name.trim().length >= 2;
  const linkedinValid = isLinkedInUrl(linkedin);
  const workValid = !work.trim() || Boolean(parseWebUrl(work));
  const openQuestions = 1 + Number(nameValid) + Number(ageAnswered) + Number(universityAnswered) + Number(linkedinValid);
  const normalizedLinkedin = useMemo(() => parseWebUrl(linkedin)?.toString() ?? "", [linkedin]);
  const normalizedWork = useMemo(() => parseWebUrl(work)?.toString() ?? "", [work]);

  const handleIntroduction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameTouched(true);
    setLinkedinTouched(true);
    setWorkTouched(true);
    if (!nameValid || !linkedinValid || !workValid) return;
    setHoneypot(String(new FormData(event.currentTarget).get("website") ?? ""));
    setRequestError("");
    setPhase("review");
  };

  const handleStart = async () => {
    if (!turnstileToken) {
      setRequestError(t.humanRequired);
      return;
    }
    setRequestState("submitting");
    setRequestError("");
    try {
      const response = await fetch(publicAsset("/api/careers/start"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), linkedin: normalizedLinkedin, work: normalizedWork, locale, website: honeypot, turnstileToken }),
      });
      const result = await responseJson(response);
      if (!response.ok || typeof result.applicationId !== "string" || !Array.isArray(result.questions)) {
        throw new Error(typeof result.error === "string" ? result.error : t.startError);
      }
      setApplicationId(result.applicationId);
      setQuestions(result.questions as QuizQuestion[]);
      setAnswers({});
      setPhase("quiz");
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : t.startError);
      setRequestState("error");
      return;
    }
    setRequestState("idle");
  };

  const handleQuiz = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (questions.some((question) => !answers[question.id])) {
      setRequestError(t.answerAll);
      return;
    }
    setRequestState("submitting");
    setRequestError("");
    try {
      const response = await fetch(publicAsset("/api/careers/quiz"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          answers: questions.map((question) => ({ questionId: question.id, choiceId: answers[question.id] })),
        }),
      });
      const result = await responseJson(response);
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : t.quizError);
      if (result.retryAllowed === true && Array.isArray(result.questions)) {
        setRetryScore(Number(result.score ?? 0));
        setQuestions(result.questions as QuizQuestion[]);
        setAnswers({});
        setRequestState("idle");
        return;
      }
      if (typeof result.uploadToken !== "string") throw new Error(t.quizError);
      setPassed(result.passed === true);
      setUploadToken(result.uploadToken);
      setPhase("upload");
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : t.quizError);
      setRequestState("error");
      return;
    }
    setRequestState("idle");
  };

  const selectResume = (file: File | null) => {
    if (!file || file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf") || file.size <= 0 || file.size > MAX_RESUME_BYTES) {
      setResume(null);
      setResumeError(t.resumeInvalid);
      return;
    }
    setResume(file);
    setResumeError("");
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    selectResume(event.dataTransfer.files.item(0));
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resume || !consent) {
      setResumeError(t.resumeInvalid);
      return;
    }
    setRequestState("submitting");
    setRequestError("");
    const form = new FormData();
    form.set("applicationId", applicationId);
    form.set("uploadToken", uploadToken);
    form.set("consent", "true");
    form.set("resume", resume);
    try {
      const response = await fetch(publicAsset("/api/careers/resume"), { method: "POST", body: form });
      const result = await responseJson(response);
      if (!response.ok || result.success !== true) throw new Error(typeof result.error === "string" ? result.error : t.uploadError);
      setPhase("success");
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : t.uploadError);
      setRequestState("error");
      return;
    }
    setRequestState("idle");
  };

  if (phase === "success") {
    return (
      <section className="career-review career-success" aria-labelledby="career-success-title" role="status">
        <div className="career-review-mark" aria-hidden="true"><Check weight="bold" /></div>
        <p className="section-kicker">{t.successKicker}</p>
        <h2 id="career-success-title">{t.successTitle}</h2>
        <p>{t.successBody}</p>
      </section>
    );
  }

  if (phase === "upload") {
    return (
      <section className="career-review career-upload-stage" aria-labelledby="career-upload-title">
        <div className="career-review-mark" aria-hidden="true">{passed ? <Check weight="bold" /> : <span>→</span>}</div>
        <p className="section-kicker">{passed ? t.clearedKicker : t.completeKicker}</p>
        <h2 id="career-upload-title">{passed ? t.clearedTitle : t.completeTitle}</h2>
        <p>{passed ? t.clearedBody : t.completeBody}</p>
        <form className="career-resume-form" onSubmit={handleUpload} noValidate>
          <input className="career-file-input" id="career-resume" name="resume" type="file" accept="application/pdf,.pdf"
            onChange={(event) => selectResume(event.target.files?.item(0) ?? null)} />
          <label
            className={`career-dropzone${dragActive ? " is-dragging" : ""}${resume ? " has-file" : ""}`}
            htmlFor="career-resume"
            onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            {resume ? <FilePdf weight="duotone" aria-hidden="true" /> : <UploadSimple weight="duotone" aria-hidden="true" />}
            <strong>{resume ? resume.name : t.resumeLabel}</strong>
            <span>{resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB · ${t.replace}` : t.resumeHelp}</span>
          </label>
          {resumeError ? <p className="career-field-error" role="alert">{resumeError}</p> : null}
          <label className="career-consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span>{t.consent}</span>
          </label>
          {requestError ? <p className="career-submit-error" role="alert">{requestError}</p> : null}
          <button className="career-send-button" type="submit" disabled={!resume || !consent || requestState === "submitting"}>
            {requestState === "submitting" ? t.uploading : t.upload} <DirectionIcon aria-hidden="true" />
          </button>
        </form>
      </section>
    );
  }

  if (phase === "quiz") {
    return (
      <section className="career-review career-quiz-stage" aria-labelledby="career-quiz-title">
        <p className="section-kicker">{retryScore === null ? t.quizKicker : t.retryKicker}</p>
        <h2 id="career-quiz-title">{retryScore === null ? t.quizTitle : t.retryTitle}</h2>
        <p>{retryScore === null ? t.quizBody : t.retryBody.replace("{score}", String(retryScore))}</p>
        <form className="career-quiz" onSubmit={handleQuiz} noValidate>
          {questions.map((question, questionIndex) => (
            <fieldset key={question.id} className="career-quiz-question">
              <legend><span>{String(questionIndex + 1).padStart(2, "0")}</span>{question.prompt}</legend>
              <div className="career-quiz-options">
                {question.choices.map((choice) => (
                  <label key={choice.id} className={answers[question.id] === choice.id ? "is-selected" : ""}>
                    <input type="radio" name={question.id} value={choice.id} checked={answers[question.id] === choice.id}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))} />
                    <span>{choice.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          {requestError ? <p className="career-submit-error" role="alert">{requestError}</p> : null}
          <button className="career-send-button" type="submit" disabled={requestState === "submitting"}>
            {requestState === "submitting" ? t.checking : t.submitAnswers} <DirectionIcon aria-hidden="true" />
          </button>
        </form>
      </section>
    );
  }

  if (phase === "review") {
    return (
      <section className="career-review" aria-labelledby="career-review-title">
        <div className="career-review-mark" aria-hidden="true"><Check weight="bold" /></div>
        <p className="section-kicker">{t.readyKicker}</p>
        <h2 id="career-review-title">{t.readyTitle}</h2>
        <p>{t.readyBody}</p>
        <dl>
          <div><dt>{t.name}</dt><dd>{name.trim()}</dd></div>
          <div><dt>{t.age}</dt><dd>{t.notUsed}</dd></div>
          <div><dt>{t.university}</dt><dd>{t.notUsed}</dd></div>
          <div><dt>{t.linkedin}</dt><dd><a href={normalizedLinkedin} target="_blank" rel="noreferrer">{linkedin.trim()} <DirectionIcon aria-hidden="true" /></a></dd></div>
          <div><dt>{t.work}</dt><dd>{normalizedWork ? <a href={normalizedWork} target="_blank" rel="noreferrer">{work.trim()} <DirectionIcon aria-hidden="true" /></a> : t.notAdded}</dd></div>
        </dl>
        <CareerTurnstile locale={locale} onToken={setTurnstileToken} />
        {requestError ? <p className="career-submit-error" role="alert">{requestError}</p> : null}
        <div className="career-review-actions">
          <button type="button" className="career-send-button" disabled={!turnstileToken || requestState === "submitting"} onClick={handleStart}>
            {requestState === "submitting" ? t.starting : t.startCheck} <DirectionIcon aria-hidden="true" />
          </button>
          <button type="button" className="career-edit-button" disabled={requestState === "submitting"} onClick={() => {
            setRequestState("idle");
            setRequestError("");
            setPhase("introduction");
          }}>{t.edit}</button>
        </div>
      </section>
    );
  }

  return (
    <form className="career-form" onSubmit={handleIntroduction} noValidate>
      <header className="career-form-header">
        <p>{t.formLabel}</p>
        <span aria-live="polite">{openQuestions}/5 {t.progress}</span>
      </header>

      <section className="career-step is-visible" aria-labelledby="career-name-label">
        <span className="career-step-index" aria-hidden="true">01</span>
        <div className="career-field">
          <label id="career-name-label" htmlFor="career-name">{t.nameLabel}</label>
          <input id="career-name" name="name" type="text" autoComplete="name" placeholder={t.namePlaceholder} value={name}
            aria-describedby={`career-name-helper${nameTouched && !nameValid ? " career-name-error" : ""}`}
            aria-invalid={nameTouched && !nameValid} onBlur={() => setNameTouched(true)} onChange={(event) => setName(event.target.value)} />
          <p id="career-name-helper" className="career-field-helper">{t.nameHelper}</p>
          {nameTouched && !nameValid ? <p id="career-name-error" className="career-field-error" role="alert">{t.nameError}</p> : null}
        </div>
      </section>

      {nameValid ? <section className="career-step is-visible" aria-labelledby="career-age-label">
        <span className="career-step-index" aria-hidden="true">02</span>
        <div className="career-field">
          <label id="career-age-label" htmlFor="career-age">{t.ageLabel}</label>
          <input id="career-age" type="text" inputMode="numeric" autoComplete="off" placeholder={t.agePlaceholder}
            value={ageAnswered ? t.notCollected : ""} disabled={ageAnswered} onChange={(event) => { if (event.target.value) setAgeAnswered(true); }} />
          {ageAnswered ? <div className="career-joke" role="status"><strong>{t.ageJoke}</strong><p>{t.ageFollowup}</p></div> : null}
        </div>
      </section> : null}

      {ageAnswered ? <section className="career-step is-visible" aria-labelledby="career-university-label">
        <span className="career-step-index" aria-hidden="true">03</span>
        <div className="career-field">
          <label id="career-university-label" htmlFor="career-university">{t.universityLabel}</label>
          <input id="career-university" type="text" autoComplete="off" placeholder={t.universityPlaceholder}
            value={universityAnswered ? t.notCollected : ""} disabled={universityAnswered} onChange={(event) => { if (event.target.value) setUniversityAnswered(true); }} />
          {universityAnswered ? <div className="career-joke" role="status"><strong>{t.universityJoke}</strong><p>{t.universityFollowup}</p></div> : null}
        </div>
      </section> : null}

      {universityAnswered ? <section className="career-step is-visible" aria-labelledby="career-linkedin-label">
        <span className="career-step-index" aria-hidden="true">04</span>
        <div className="career-field">
          <label id="career-linkedin-label" htmlFor="career-linkedin">{t.linkedinLabel}</label>
          <input id="career-linkedin" name="linkedin" type="text" inputMode="url" autoComplete="url" placeholder={t.linkedinPlaceholder} value={linkedin}
            aria-describedby={`career-linkedin-helper${linkedinTouched && !linkedinValid ? " career-linkedin-error" : ""}`}
            aria-invalid={linkedinTouched && !linkedinValid} onBlur={() => setLinkedinTouched(true)}
            onChange={(event) => { setLinkedin(event.target.value); setLinkedinTouched(false); }} />
          <p id="career-linkedin-helper" className="career-field-helper">{t.linkedinHelper}</p>
          {linkedinTouched && !linkedinValid ? <p id="career-linkedin-error" className="career-field-error" role="alert">{t.linkedinError}</p> : null}
        </div>
      </section> : null}

      {linkedinValid ? <section className="career-step is-visible" aria-labelledby="career-work-label">
        <span className="career-step-index" aria-hidden="true">05</span>
        <div className="career-field">
          <label id="career-work-label" htmlFor="career-work">{t.workLabel} <span>{t.optional}</span></label>
          <input id="career-work" name="work" type="text" inputMode="url" autoComplete="url" placeholder={t.workPlaceholder} value={work}
            aria-describedby={`career-work-helper${workTouched && !workValid ? " career-work-error" : ""}`}
            aria-invalid={workTouched && !workValid} onBlur={() => setWorkTouched(true)}
            onChange={(event) => { setWork(event.target.value); setWorkTouched(false); }} />
          <p id="career-work-helper" className="career-field-helper">{t.workHelper}</p>
          {workTouched && !workValid ? <p id="career-work-error" className="career-field-error" role="alert">{t.workError}</p> : null}
          <button className="career-review-button" type="submit" disabled={!workValid}>{t.review} <DirectionIcon aria-hidden="true" /></button>
        </div>
      </section> : null}

      <div className="career-honeypot" aria-hidden="true">
        <label htmlFor="career-website">Website</label>
        <input id="career-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
