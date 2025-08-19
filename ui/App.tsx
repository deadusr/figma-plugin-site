import { useCallback, useRef, useState } from "react";
import Button from "./components/button";
import Checkbox from "./components/checkbox";
import Code from "./components/code"
import Colors from "./components/colors";
import Icon from "./components/icon"
import Images from "./components/images";
import Instances from "./components/instances";
import Layers from "./layers/layers"
import { useCodeStore, useColorsStore, useImagesStore, onNotify } from "./main";
import StyleConfig from "./styleconfig";

const CopyButton = ({ text, copyToClipboard }: { text: string, copyToClipboard: (text: string) => void }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleClick = () => {
    copyToClipboard(text);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button className="w-4 h-4 outline-none" onClick={handleClick}>
      <Icon className={copied ? "text-icon-brand" : "text-icon"} icon="clipboard.small.24" />
    </button>
  );
};

function App() {
  const { html, css } = useCodeStore();
  const imagesData = useImagesStore();
  const colorsData = useColorsStore();

  const copyToClipboard = useCallback((text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    onNotify('Copied to clipboard');
  }, []);


  const images = imagesData.images.map(({ name, base64Src }) => ({ name: name, src: base64Src }));


  return (
    <>
      <main className="font-body text-text">
        <Layers />

        <section className="flex flex-col">
          <div className="border-t border-border">
            <div className="group flex items-center justify-between pl-3 pr-2 h-6 ">
              <span className="text-body-medium font-strong">Inspect</span>

              <button className="w-4 h-4 bg-bg-selected rounded-medium outline-none">
                <Icon className="text-icon-brand" icon="codeSnippet.24" />
              </button>
            </div>

            <div className="h-5 pl-3 pr-2 py-1 flex justify-between items-center">
              <span className="text-body-medium">Code
                <span className="text-text-secondary"> Modal.jsx</span>
              </span>
              <CopyButton text={html} copyToClipboard={copyToClipboard} />
            </div>
            <div className="pl-3 pr-2 py-2">
              <Code code={html} />
            </div>

            <div className="h-5 pl-3 pr-2 py-1 flex justify-between items-center">
              <span className="text-body-medium">Styles
                <span className="text-text-secondary"> main.css</span>
              </span>
              <CopyButton text={css} copyToClipboard={copyToClipboard} />
            </div>
            <div className="pl-3 pr-2 py-2">
              <Code code={css} />
            </div>

            <StyleConfig />


            <div className="h-5 pl-3 pr-2 py-1 flex justify-between items-center">
              <span className="text-body-medium text-text">Components</span>
            </div>
            <div className="pl-3 pr-2 py-1">
              <Instances />
            </div>




            <div className="h-5 pl-3 pr-2 py-1 flex justify-between items-center">
              <span className="text-body-medium text-text">Colors</span>
            </div>

            <div className="pl-3 pr-2 py-2">
              <Colors colors={colorsData.colors} />
            </div>
          </div>


          <div className="border-t border-border">
            <div className="group flex items-center justify-between pl-3 pr-2 h-6">
              <span className="text-body-medium font-strong">Assets</span>
            </div>

            <div className="">
              <Images images={images} />
            </div>
          </div>


          <div className="border-t border-b border-border pb-2 mb-6">
            <div className="group flex items-center justify-between pl-3 pr-2 h-6">
              <span className="text-body-medium font-strong">Export</span>
            </div>

            <div>
              <div className="pl-3 pr-2 py-2">
                <Checkbox active onClick={() => { }} name="Generate components code" />
              </div>

              <div className="pl-3 pr-2 py-2">
                <Checkbox onClick={() => { }} name="Generate color palette" />
              </div>

              <div className="pl-3 pr-2 py-2">
                <Checkbox onClick={() => { }} name="Export images" />
              </div>
            </div>

            <div className="pl-3 pr-2 py-2">
              <Button className="w-full" type='secondary' >Export Frame</Button>
            </div>


            <div >
              <div className="px-2 py-1">
                <button className="flex items-center text-text-tertiary text-body-medium font-strong outline-none">
                  <Icon className="text-icon-tertiary" icon="chevron.down.16" />
                  Preview Modal.zip
                </button>
              </div>

              <div className="px-2 pl-4 py-1">
                <div className="flex items-center gap-2 text-body-medium">
                  <Icon icon="dev.16" />
                  Modal.tsx
                </div>
              </div>


              <div className="px-2 py-1">
                <button className="flex items-center outline-none">
                  <Icon className="text-icon-tertiary" icon="chevron.down.16" />
                  <div className="flex items-center gap-2 text-body-medium">
                    <Icon icon="folder.16" />
                    Components
                  </div>
                </button>
              </div>

              <div className="px-2 pl-6 py-1">
                <div className="flex items-center gap-2 text-body-medium">
                  <Icon icon="dev.16" />
                  Button.tsx
                </div>
              </div>

              <div className="px-2 pl-6 py-1">
                <div className="flex items-center gap-2 text-body-medium">
                  <Icon icon="dev.16" />
                  Modal.tsx
                </div>
              </div>

              <div className="px-2 py-1">
                <button className="flex items-center outline-none">
                  <Icon className="text-icon-tertiary" icon="chevron.down.16" />
                  <div className="flex items-center gap-2 text-body-medium">
                    <Icon icon="folder.16" />
                    Assets
                  </div>
                </button>
              </div>

              <div className="px-2 pl-6 py-1">
                <div className="flex items-center gap-2 text-body-medium">
                  <Icon icon="image.16" />
                  Image1.png
                </div>
              </div>


              <div className="px-2 pl-6 py-1">
                <div className="flex items-center gap-2 text-body-medium">
                  <Icon icon="image.16" />
                  icon-1.svg
                </div>
              </div>

            </div>

          </div>

        </section>
      </main>
    </>
  )
}

export default App
