// client/src/components/ui/Alert.tsx

// Reusable alert component with different variants

interface AlertProps {
 type: 'success' | 'error' | 'info' | 'warning'; // Alert type
    message: string; // Alert message
    onClose?: () => void; // Optional close handler
}

// Alert function component
function Alert({ type, message, onClose }: AlertProps) {
    // styles for different alert types
    const styles = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    };

    return (
        <div className={`border-l-4 p-4 rounded mb-4 ${styles[type]}`}>
            <div className="flex justify-between items-center">
                <p>{message}</p>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-4 font-bold hover:opacity-70"
                    >
                                                ×
                    </button>
                )}
            </div>
        </div>
    );
}

// Export the Alert component

export default Alert;