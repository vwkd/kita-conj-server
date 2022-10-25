import { definitions } from "./deps.ts";
import getPRS from "./forms/present.ts";

export const entries = definitions.map(d => generate(d));

// todo: validate preverb, version, root, thema
function generate({ id, preverb, version, root, thema }) {

  const value = getTable({ preverb, version, root, thema });
  
  return {
    id,
    value,
  };
}

function getTable(args) {
  const PRS = getScreeve(args, getPRS);
  // todo: placeholder, fill with actual screeves
  const IMPF = PRS;
  const PRSSUBJ = PRS;
  const FUT = PRS;
  const COND = PRS;
  const FUTSUBJ = PRS;
  const AOR = PRS;
  const AORIMPF = PRS;
  const OPT = PRS;
  const OPTIMPF = PRS;
  const PERF = PRS;
  const PERFIMPF = PRS;
  const PLUPERF = PRS;
  const PLUPERFIMPF = PRS;
  const PERFSUBJ = PRS;
  const PERFSUBJIMPF = PRS;
  const IMPAFF = PRS;
  const IMPAFFIMPF = PRS;
  const IMPPRB1 = PRS;
  const IMPPRB1IMPF = PRS;
  const IMPPRB2 = PRS;
  const INF = PRS;
  const INFIMPF = PRS;
  
  return {
    PRS,
    IMPF,
    PRSSUBJ,
    FUT,
    COND,
    FUTSUBJ,
    AOR,
    AORIMPF,
    OPT,
    OPTIMPF,
    PERF,
    PERFIMPF,
    PLUPERF,
    PLUPERFIMPF,
    PERFSUBJ,
    PERFSUBJIMPF,
    IMPAFF,
    IMPAFFIMPF,
    IMPPRB1,
    IMPPRB1IMPF,
    IMPPRB2,
    INF,
    INFIMPF,
  };
}

function getScreeve(args, getForm) {
  const S1 = wrapComponent(getForm(args, "S1"));
  const S2 = wrapComponent(getForm(args, "S2"));
  const S3 = wrapComponent(getForm(args, "S3"));
  const P1 = wrapComponent(getForm(args, "P1"));
  const P2 = wrapComponent(getForm(args, "P2"));
  const P3 = wrapComponent(getForm(args, "P3"));
  
  return {
    S1,
    S2,
    S3,
    P1,
    P2,
    P3,
  };
}

function wrapComponent({ preverb, person1, version, root, thema, person2 }) {
  return {
    preverb: getComponent("preverb", preverb),
    person1: getComponent("person1", person1),
    version: getComponent("version", version),
    root: getComponent("root", root),
    thema: getComponent("thema", thema),
    person2: getComponent("person2", person2),
  };
}

function getComponent(label, value) {
  return {
    label,
    value,
  };
}
