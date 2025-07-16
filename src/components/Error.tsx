export const Error = ({ error }: { error: globalThis.Error }) => {
    return (
        <div>
            <p>An error has occured: {error.name}</p>
            <p>Details: {String(error.cause)}</p>
            <p>Stacktrace: {error.stack}</p>
        </div>
    );
};
