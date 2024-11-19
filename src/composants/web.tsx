

interface WebViewerProps {
    url: string;
}

const WebViewer: React.FC<WebViewerProps> = ({ url }) => {
    return (
        <iframe
            src={url}
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="Web Viewer"
        />
    );
};

export default WebViewer;