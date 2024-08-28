import { LayoutGrid } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];
  const [selectedcolor, setSelectedColor] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const onChangeColor = (item) => {
    setSelectedColor(item);
    setResumeInfo({ ...resumeInfo, themeColor: item });
    const data = {
      data: {
        themeColor: item,
      },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (res) => {
        console.log(res);
        toast("Theme color updated successfully");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="flex gap-2">
            <LayoutGrid /> Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => onChangeColor(color)}
                className={`w-5 h-5 rounded-full cursor-pointer hover:border-black border ${
                  selectedcolor == color && "border border-black"
                }`}
                style={{ background: color }}
              ></div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ThemeColor;
