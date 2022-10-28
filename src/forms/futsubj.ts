import { Form } from "./utils.ts";
import { select_person1_s } from "./prs.ts";
import { select_person2_s } from "./prssubj.ts";

export default function getPRSSUBJ(args, exceptions, person_s) {
  const form = Form();
  
  form.preverb = args.preverb;
  form.person1 = select_person1_s(person_s);
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = "დ";
  form.person2 = select_person2_s(person_s);
  
  form.preverbExc = exceptions.preverb;
  form.person1Exc = exceptions.person1;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  form.person2Exc = exceptions.person2;
  
  return form;
}
