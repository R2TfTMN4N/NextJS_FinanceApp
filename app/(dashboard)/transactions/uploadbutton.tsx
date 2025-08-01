import { Upload } from "lucide-react";
import {useCSVReader} from "react-papaparse";
import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (results: {
    data: string[][];
    errors: unknown[];
    meta: unknown;
  }) => void;
};
export const UploadButton=({onUpload}:Props) => {
    const {CSVReader} = useCSVReader();

    return (
      <CSVReader onUploadAccepted={onUpload}>
        {({
          getRootProps,
        }: {
          getRootProps: () => Record<string, unknown>;
        }) => (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            {...getRootProps()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>
        )}
      </CSVReader>
    );
}