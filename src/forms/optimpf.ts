import { error, Form } from "./utils.ts";
import { select_person1_s } from "./prs.ts";
import { select_person2_s } from "./opt.ts";

export default function getOPTIMPF(args, exceptions, person_s) {
  const form = Form();
  
  form.preverb = null;
  form.person1 = select_person1_s(person_s);
  form.version = args.version;
  form.root = args.root;
  
  form.preverbExc = exceptions.preverb;
  form.person1Exc = exceptions.person1;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  
  const rootValue = form.root.value;
  const rootNote = form.root.note;
  const themaValue = form.thema.value;
  form.person2 = select_person2_s(person_s, rootValue, rootNote, themaValue);
  form.person2Exc = exceptions.person2;
  
  form.thema = null;
  form.modus = null;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  
  return form;
}
