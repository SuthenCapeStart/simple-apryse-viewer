import logo from './logo.svg';
import './App.css';
import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef, useState } from 'react';
import { useBoolean } from '@fluentui/react-hooks';
import { DefaultButton, MessageBarType, Panel, PanelType, PrimaryButton } from '@fluentui/react';
import { format } from 'date-fns';

function App() {
  const viewer = useRef(null);
  const viewerInstanceRef = useRef();
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [annotations, setAnnotations] = useState([]);

  const panelButton = (instance) => ({
    type: 'actionButton',
    img: "https://www.svgrepo.com/show/532033/cloud.svg",
    onClick: () => {
        const { UI, Core } = instance;
        const { Tools, annotationManager, Annotations } = Core;
        const redactionList = annotationManager.getAnnotationsList().filter(annot => annot instanceof Annotations.RedactionAnnotation);
        setAnnotations(redactionList);
        UI.setToolMode(Tools.ToolNames.TEXT_SELECT)
        openPanel();
    },
    dataElement: 'RedactPanelIconButton',
    title: 'Redact Panel',
});

  useEffect(() => {
        WebViewer(
          {
            path: '/webviewer/public',
            initialDoc: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
            licenseKey: 'demo:1713432176724:7fefbdcd030000000096588687e7321658afde8b1b325f6d51ae3228f6',
            enableRedaction: true,
            fullAPI: true,
            css: '/webviewer/public/index.css'
          },
          viewer.current,
        ).then(async(instance) => {
            viewerInstanceRef.current = instance;
            const { UI, Core } = instance;
            const { Tools } = Core;
            const { Feature } = UI;
            UI.enableFeatures([Feature.Redaction]);
            UI.disableElements([
                'redactionPanel', 'pageRedactionToolGroupButton', 'redactionPanelToggle', 'annotationRedactButton',
                'textRedactToolButton', 'toolbarGroup-View', 'toolbarGroup-Insert', 'toolbarGroup-Annotate',
                'toolbarGroup-Shapes', 'toolbarGroup-Edit', 'toolbarGroup-FillAndSign', 'toolbarGroup-Forms', 'toggleNotesButton'
            ]);
            UI.disableFeatures([Feature.NotesPanel, Feature.NotesPanelVirtualizedList, Feature.NotesShowLastUpdatedDate]);
            UI.setToolMode(Tools.ToolNames.TEXT_SELECT);

            UI.setHeaderItems(header => {
              const redactionToolGroupButton = () => header.getHeader('toolbarGroup-Redact').get('redactionToolGroupButton');
              redactionToolGroupButton().insertBefore(panelButton(instance));
            });
        })
  }, [])

  const getTitle = (annotation) => {
    if (annotation?.Fk && annotation?.Fk["trn-annot-preview"]) {
        return annotation?.Fk["trn-annot-preview"];
    }
    return "Region redaction";
  }

  const handleRedactAll = async() => {
    try {
      const { documentViewer, annotationManager, Annotations, PDFNet } = viewerInstanceRef.current?.Core;
      const redactionList = annotationManager.getAnnotationsList().filter(annot => annot instanceof Annotations.RedactionAnnotation);
      await annotationManager.applyRedactions(redactionList);
      setAnnotations([]);
      dismissPanel();
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  }

  const handleClearRedact = async() => {
    const { Annotations, annotationManager } = viewerInstanceRef.current?.Core;
    const redactionList = annotationManager.getAnnotationsList().filter(annot => annot instanceof Annotations.RedactionAnnotation);
    annotationManager.deleteAnnotations(redactionList);
    setAnnotations([]);
    dismissPanel();
  }

  const handleSelectRedact = async(annotation) => {
    const { Annotations, annotationManager } = viewerInstanceRef.current?.Core;
    const redactionList = annotationManager.getAnnotationsList().filter(annot => annot instanceof Annotations.RedactionAnnotation);
    annotationManager.deselectAnnotations(redactionList)
    annotationManager.selectAnnotation(annotation);
  }

  const handleSingleClearRedact = async(annotation) => {
    const { annotationManager } = viewerInstanceRef.current?.Core;
    annotationManager.deleteAnnotation(annotation);
    const newAnnotations = annotations.filter(annot => annot?.yk !== annotation?.yk)
    setAnnotations(newAnnotations);
  }


  const renderHeader = () => (
    <div className='mx-4' style={{width: "100%"}}>
        <h1 className='sub-header'> Marked for Redaction {annotations.length ? `(${annotations.length})` : null}</h1>
    </div>
  );

  const onRenderFooterContent = () => (
    <div className='d-flex gap-2'>
        <PrimaryButton onClick={handleRedactAll} >
            Redact All
        </PrimaryButton>
        <DefaultButton onClick={handleClearRedact}>Clear</DefaultButton>
        <DefaultButton onClick={dismissPanel}>Close</DefaultButton>
    </div>
  );
  

  return (
    <div className="App">
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
      <Panel
        onRenderHeader={renderHeader}
        isLightDismiss
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        type={PanelType.smallFixedFar}
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom
        styles={{ content: {padding: "8px"}}}
        >
          {
          annotations.length ?
          <div className='redaction-list'>
              {
              annotations.map((annotation, i) => (
                  <div className='redaction-item' tabIndex={0} onClick={() => handleSelectRedact(annotation)}  key={annotation?.Jk}>
                      {/* <div className="redaction-type-icon">
                          <img src={(annotation?.Fk && annotation?.Fk["trn-annot-preview"]) ? TextSelectionIcon : RegionSelectionIcon} alt="type-icon" />
                      </div> */}
                      <div className="redact-title-desc">
                          <p className="redact-title">{getTitle(annotation)}</p>
                          <p className="redact-desc"><span style={{ fontWeight: 600 }}>Label Text: </span>{annotation?.OverlayText}</p>
                          <p className="redact-user">{format(new Date(annotation?.AN), "MMM dd, HH:mm")}</p>
                      </div>
                      {/* <div className={`redaction-close-icon ${isRedacting ? "" : "redaction-close-icon-cursor"}`}>
                          <img src={Close} alt="close-icon" onClick={() => handleSingleClearRedact(annotation)}/>
                      </div> */}
                  </div>
              ))
              }
          </div>
          : 
          <div className='d-flex justify-content-center align-items-center flex-column' style={{ width: "100%", height: "100%" }}>
              {/* <img src={NewFileBlue} alt="No redaction Found" style={{ height: "100px" }} /> */}
              <p className='pt-4 text-center fs-6'>
                  Start redacting by marking text, regions, pages or making a search.
              </p>
          </div>
          }
      </Panel>
    </div>
  );
}

export default App;
