import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProjectTagProps = {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
};
const ProjectTag = ({ name, onClick, isSelected }: ProjectTagProps) => {
  const buttonStyles = isSelected
    ? "text-white border-primary-500"
    : "text-[#ADB7BE] border-slate-600 hover:border-white";
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      {/* <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent> */}
    </Tabs>
    // <button className={`${buttonStyles} `} onClick={() => onClick(name)}>
    //   {name}
    // </button>
  );
};

export default ProjectTag;
