import {FC} from 'react';

interface Props {
    files: File[];
}

const FormFileInputList: FC<Props> = ({files}) => {
    return (
        <div className="flex flex-col space-y-2">
            {files.map((file: File) => <div key={file.name}
                className="bg-white border shadow-md rounded-lg p-4">
                <h1 className="text-lg font-bold">{file.name}</h1>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-400 font-light">{file.type}</span>
                    <span className="text-sm text-gray-400 font-light">{file.size} bytes</span>
                </div>
            </div>)}
        </div>
    );
};

export default FormFileInputList;
