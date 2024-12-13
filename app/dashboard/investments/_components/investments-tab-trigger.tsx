import { TabsTrigger } from "@/components/ui/tabs";
import { InvestmentTab } from "@/lib/validations/investment";

const InvestmentsTabTrigger = ({
  tabValue,
  title,
}: {
  tabValue: InvestmentTab;
  title: string;
}) => {
  return <TabsTrigger value={tabValue}>{title}</TabsTrigger>;
};

export default InvestmentsTabTrigger;
