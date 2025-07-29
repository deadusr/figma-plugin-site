import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MessagesFromPlugin } from '../types/messagesFromPlugin'
import App from './App.js'
import { create } from 'zustand'
import { Tags, TPageChildren } from '../types'
import { MessageToPlugin } from '../types/messagesToPlugin';
import { isEqual, sortBy } from 'lodash';
import { ColorInfo, ImageInfo } from '../plugin/codeGenerators/tags'

export const usePageChildrenStore = create<{ children: TPageChildren[] }>(() => ({ children: [] }))
export const usePageSelectionStore = create<{ nodeId: string | null, setSelectedNode: (nodeId: string) => void }>((set) => ({
  nodeId: null,
  setSelectedNode: (nodeId: string) => {
    set({ nodeId })
  }
}))

export const useCodeStore = create<{ html: string, css: string }>(() => ({ css: '', html: '' }))
export const useImagesStore = create<{ images: ImageInfo[] }>(() => ({ images: [] }));
export const useColorsStore = create<{ colors: ColorInfo[] }>(() => ({ colors: [] }));


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


export const onSelectNode = (nodeId: string | null) => {
  const message: MessageToPlugin = {
    "message": "selectNodes",
    "value": {
      nodes: nodeId === null ? [] : [nodeId]
    }
  }
  parent.postMessage({ pluginMessage: message }, "*")
}

export const onToggleExpandNode = (nodeId: string) => {
  const message: MessageToPlugin = {
    "message": "toggleExpandNode",
    "value": {
      node: nodeId
    }
  }
  parent.postMessage({ pluginMessage: message }, "*")
}

export const onSetHtmlTagToNode = (nodeId: string, tag: string) => {
  const message: MessageToPlugin = {
    "message": "setHtmlTagToNode",
    "value": {
      node: nodeId,
      tag
    }
  }
  parent.postMessage({ pluginMessage: message }, "*")
}

export const onGetCode = (nodeId: string) => {
  const message: MessageToPlugin = {
    "message": "getCode",
    "value": {
      node: nodeId,
    }
  }
  parent.postMessage({ pluginMessage: message }, "*")
}


onmessage = ({ data }: MessageEvent<{ pluginMessage: MessagesFromPlugin }>) => {
  const { message, value } = data.pluginMessage;

  switch (message) {
    case 'PageNode.updated':
      const { children } = usePageChildrenStore.getState();

      if (isEqual(children, value.children))
        break;

      usePageChildrenStore.setState({ children: value.children })
      break;

    case 'Selected.updated':
      const { setSelectedNode } = usePageSelectionStore.getState();
      setSelectedNode(value.nodes[0])
      break;

    case 'Code.updated':
      const { html, css, assets } = value;
      useCodeStore.setState({ html, css })
      useImagesStore.setState({ images: assets.images });
      useColorsStore.setState({ colors: assets.colors });
  }
}



