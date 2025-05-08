
const MessageSkeleton = () => {

    const skeletonMessages = Array(6).fill(null);
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {skeletonMessages.map((_, idx) => (
            <div
                key={idx}
                className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} items-start space-y-2`}
            >
                {/* Avatar Skeleton */}
                <div className="chat-image avatar">
                    <div className="size-10 rounded-full bg-base-300 animate-pulse" />
                </div>

                {/* Header Skeleton */}
                <div className="chat-header mb-1">
                    <div className="h-4 w-16 rounded bg-base-300 animate-pulse" />
                </div>

                {/* Message Bubble Skeleton */}
                <div className="chat-bubble bg-transparent p-0">
                    <div className="h-16 w-[200px] rounded-xl bg-base-300 animate-pulse" />
                </div>
            </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;