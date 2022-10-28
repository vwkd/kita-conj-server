import { Form } from "./utils.ts";
import { select_person1_s, select_person2_s } from "./prs.ts";

export default function getFUT(args, exceptions, person_s) {
  const form = Form();
  
  form.preverb = args.preverb;
  form.person1 = select_person1_s(person_s);
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = null;
  
  form.preverbExc = exceptions.preverb;
  form.person1Exc = exceptions.person1;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  
  const stem = form.stemValue;
  form.person2 = select_person2_s(stem, person_s);
  form.person2Exc = exceptions.person2;
  
  return form;
}
