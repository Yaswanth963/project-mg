import { useEffect, useRef } from "react";
import "../styles/styles.css";

type DescriptionPreviewProps = {
    content: string;
};

export const DescriptionPreview: React.FC<DescriptionPreviewProps> = ({ content }) => {
    const previewRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (previewRef.current) {
            previewRef.current.textContent = content;
        }
    }, [content]);

    return (
        <div className="pre-container">
            <pre ref={previewRef}>
            </pre>
        </div>
    );
};
