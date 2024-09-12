import QuizDetailContent from "./dashboardContent/QuizDetailContent";
import DesktopSidebar from "./dashboardLayout/DesktopSidebar";
import ResponsiveSidebar from "./dashboardLayout/ResponsiveSidebar";
import SidebarHeader from "./dashboardLayout/SidebarHeader";
interface QuizDetailMainProps {
    id: string;
  }
  const QuizDetailMain: React.FC<QuizDetailMainProps> = ({ id }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* sidebarHeader */}
          <SidebarHeader />

          {/* desktop sidebar */}
          <DesktopSidebar />
        </div>
      </div>
      <div className="flex flex-col">
        {/* <header className="flex h-14 items-center gap-4  bg-muted/40 px-4 lg:h-[60px] lg:px-6"> */}
          {/* responsive sidebar */}
          <ResponsiveSidebar />

    
        {/* </header> */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <QuizDetailContent id={id}/>
        </main>
      </div>
    </div>
  );
}

export default QuizDetailMain;
