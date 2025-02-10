
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { List, CheckSquare, Plus, Calendar, ArrowRight } from "lucide-react";

export const PlanningList = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    vision: "",
    obstacles: "",
    actions: "",
    timeline: "",
    success: ""
  });

  const steps = [
    {
      title: "Definujte svou vizi",
      description: "Kde chcete být za rok? Buďte konkrétní a popište svůj ideální stav.",
      field: "vision",
      prompts: [
        "Co konkrétně chcete dosáhnout?",
        "Proč je to pro vás důležité?",
        "Jak se budete cítit, až toho dosáhnete?"
      ]
    },
    {
      title: "Identifikujte překážky",
      description: "Co vám může bránit v dosažení vašeho cíle?",
      field: "obstacles",
      prompts: [
        "Jaké překážky očekáváte?",
        "Co vás v minulosti zastavilo?",
        "Jak můžete tyto překážky překonat?"
      ]
    },
    {
      title: "Naplánujte akce",
      description: "Jaké konkrétní kroky potřebujete podniknout?",
      field: "actions",
      prompts: [
        "Jaké jsou první 3 kroky?",
        "Jaké dovednosti potřebujete rozvíjet?",
        "Kdo vám může pomoci?"
      ]
    },
    {
      title: "Stanovte časový plán",
      description: "Rozdělte svůj cíl na menší milníky",
      field: "timeline",
      prompts: [
        "Jaký je váš první milník?",
        "Co chcete dosáhnout za měsíc?",
        "Jaké jsou vaše kvartální cíle?"
      ]
    },
    {
      title: "Definujte úspěch",
      description: "Jak poznáte, že jste dosáhli svého cíle?",
      field: "success",
      prompts: [
        "Jaké jsou měřitelné indikátory úspěchu?",
        "Jak budete sledovat svůj pokrok?",
        "Jak často budete revidovat své cíle?"
      ]
    }
  ];

  const handleInputChange = (field: keyof typeof answers, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <List className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Plánování cílů</h2>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">Krok {currentStep} z {steps.length}</span>
          <div className="w-32 h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">{currentStepData.title}</h3>
          <p className="text-white/70 mb-4">{currentStepData.description}</p>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Zapište své myšlenky..."
            value={answers[currentStepData.field]}
            onChange={(e) => handleInputChange(currentStepData.field as keyof typeof answers, e.target.value)}
            className="min-h-[120px]"
          />

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Pomocné otázky:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {currentStepData.prompts.map((prompt, index) => (
                <li key={index} className="text-sm text-white/60">{prompt}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Předchozí
          </Button>
          <Button
            onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
            disabled={currentStep === steps.length}
          >
            Další
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {currentStep === steps.length && (
          <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckSquare className="w-5 h-5 text-green-500" />
              <h4 className="font-medium">Shrnutí plánu</h4>
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <p><strong>Vize:</strong> {answers.vision}</p>
              <p><strong>Překážky:</strong> {answers.obstacles}</p>
              <p><strong>Akce:</strong> {answers.actions}</p>
              <p><strong>Časový plán:</strong> {answers.timeline}</p>
              <p><strong>Měření úspěchu:</strong> {answers.success}</p>
            </div>
            <Button className="w-full mt-4" onClick={() => setCurrentStep(1)}>
              Vytvořit nový plán
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
