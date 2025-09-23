import {
  ArrowLeft,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeProps {
  onBack: () => void;
}

export default function Resume({ onBack }: ResumeProps) {

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/uploads/Kaiden_Pollesch-Resume.pdf";
    link.download = "Kaiden_Pollesch-Resume.pdf";
    link.click();
  };

  const handleBack = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "instant" });
    }
    onBack();
  };

  return (
    <div className="min-h-screen p-8 relative z-10" style={{ overflow: "hidden" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-4 h-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleDownload} className="h-10">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
        <div
          className="bg-white text-black p-8 rounded-lg shadow-lg flex justify-center items-center"
          style={{
            height: "calc(100vh - 100px - 4rem)", // 100px gap, 4rem for top/bottom padding
            marginTop: "0px",
            overflow: "hidden"
          }}
        >
          <iframe
            src="/uploads/Kaiden_Pollesch-Resume.pdf"
            title="Kaiden Pollesch Resume"
            width="100%"
            height="100%"
            style={{ border: "none", margin: 0, padding: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
