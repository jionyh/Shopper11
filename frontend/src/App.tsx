import { useState } from "react";
import { RideList, NewRide, Landing } from "./components/home/Index";
import { viewType } from "./types/View";

function App() {
  const [view, setView] = useState<viewType>("landing");

  const handleChangeView = (viewType: viewType) => {
    setView(viewType);
  };
  return (
    <div className="container m-auto max-h-screen min-h-screen max-w-screen-xl p-10">
      <div className="flex w-full overflow-y-auto rounded-lg border border-slate-100 shadow-md">
        {view === "landing" && <Landing setView={setView} />}
        {view === "list" && <RideList handleClick={handleChangeView} />}
        {view === "new" && <NewRide setView={setView} />}
      </div>
    </div>
  );
}
export default App;
