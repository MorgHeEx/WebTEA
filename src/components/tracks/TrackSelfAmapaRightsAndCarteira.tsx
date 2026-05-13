import { AmapaDireitosSection } from "../amapa/AmapaDireitosSection";
import { CarteiraTeaAmapaSection } from "../amapa/CarteiraTeaAmapaSection";

type RightsBlockProps = {
  getChecklist: (id: string) => boolean[];
  setChecklistItem: (id: string, index: number, checked: boolean) => void;
};

export function TrackSelfAmapaRightsAndCarteira({ getChecklist, setChecklistItem }: RightsBlockProps) {
  return (
    <div className="space-y-8">
      <AmapaDireitosSection />
      <CarteiraTeaAmapaSection getChecklist={getChecklist} setChecklistItem={setChecklistItem} />
    </div>
  );
}
