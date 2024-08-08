import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button size="sm" variant="outline" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
        <div className="flex items-center gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            // disabled={!enableNext}
          >
            {" "}
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal detail */}
      {activeFormIndex === 1 && <PersonalDetail enableNext={(v)=>setEnableNext(v)}/>}
      {/* summery */}
      {activeFormIndex === 2 && <Summery />}
      {/* work experience*/}
      {activeFormIndex === 3 && <Experience />}
      {/* Educational detail */}
      {/* Skills */}
    </div>
  );
}

export default FormSection;
