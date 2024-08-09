import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AiChatSession } from "../../../../service/AiModal";
import { toast } from "sonner";

function RichTextEditor({ onRichTextChange,index,defaultValue}) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  const prompt=`just only depends on ${resumeInfo?.experience[index]?.title}(this job title) give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result just in HTML tags`;

// const prompt=`Give me the code snippet of 5-7 Unordered list of HTML Code just only depends on ${resumeInfo?.experience[index]?.title}(this job title)`
  let GenerateSummeryFromAi = async () => {
    if(!resumeInfo?.experience[index]?.title)
        {
          toast('Please Add Position Title');
          return ;
        }
    setLoading(true);
    console.log(prompt);
    const result = await AiChatSession.sendMessage(prompt);
    const resp=result.response.text()
    console.log(resp);
    setValue(resp);
    setLoading(false);
  }
  return (
    <div>
        <div className="flex justify-between items-end my-2">
          <label className="text-xs">Add Summery</label>
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={GenerateSummeryFromAi}
            className="border-primary text-primary flex gap-2 items-center"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <Brain className="w-4 h-4"/>
            Generate with AI
          </Button>
        </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextChange(e);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
