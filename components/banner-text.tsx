import FormDiv from "./form-div";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BannerText({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) {
  return (
    <FormDiv>
      <Label htmlFor="bannerText">Enter text for your banner:</Label>
      <Textarea
        id="bannerText"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your banner text here..."
      />
    </FormDiv>
  );
}
