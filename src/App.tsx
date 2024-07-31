import React from 'react';
//import { TopicProvider } from './contexts/TopicContext';
//import { ChatProvider } from './contexts/ChatContext';
import LeftPanel from '@/components/LeftPanel/LeftPanel';
import ChatArea from '@/components/ChatArea/ChatArea';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


function App() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <LeftPanel />
      </ResizablePanel>
      <ResizableHandle className="" withHandle/>
      <ResizablePanel defaultSize={70}>
        <ChatArea />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}



/*
function App() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen"
    >
         <ResizablePanel defaultSize={50}>
    <ResizablePanelGroup direction="vertical">     
          <ResizablePanel defaultSize={5}>
            <div className="flex h-full items-center justify-center p-6 bg-red-500">
              <span className="font-semibold">one</span>
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={95}>
            <div className="flex h-full items-center justify-center p-6 bg-red-500">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>

    </ResizablePanelGroup>
    </ResizablePanel>
          <ResizableHandle withHandle/>
                    <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6 bg-red-500">
              <span className="font-semibold">three</span>
            </div>
          </ResizablePanel>

    </ResizablePanelGroup>
  )
}

*/

export default App
