import { Form } from "./utils.ts";

export default function getPlaceholder(args, exceptions, person_s) {
  const form = Form("S1", "S1", "DIRECT");
  
  form.preverb = null;
  form.person1 = null;
  form.version = "NEUTRAL1";
  form.root = "...";
  form.thema = null;
  form.modus = null;
  form.person2 = null;
  
  return form;
}
