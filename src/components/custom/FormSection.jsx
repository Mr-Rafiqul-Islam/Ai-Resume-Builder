import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/dashboard">
            <Button size="sm">
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
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
            className={`flex gap-2 ${activeFormIndex === 6 ? "hidden" : ""}`}
            size="sm"
            onClick={() => {
              setActiveFormIndex(activeFormIndex + 1);
              setEnableNext(false);
            }}
            disabled={activeFormIndex === 1 && !enableNext}
          >
            {" "}
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal detail */}
      {activeFormIndex === 1 && (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      )}
      {/* summery */}
      {activeFormIndex === 2 && <Summery />}
      {/* work experience*/}
      {activeFormIndex === 3 && <Experience />}
      {/* Educational detail */}
      {activeFormIndex === 4 && <Education />}
      {/* Skills */}
      {activeFormIndex === 5 && <Skills />}
      {/* navigate to view download and share page */}
      {activeFormIndex === 6 && <Navigate to={`/my-resume/${resumeId}/view`} />}
    </div>
  );
}

export default FormSection;
