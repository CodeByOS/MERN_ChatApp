import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300 bg-base-100 rounded-t-2xl shadow-sm">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
                <div className="size-10 rounded-full relative ring ring-base-300 ring-offset-2">
                <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt={selectedUser.fullName}
                    className="object-cover w-full h-full rounded-full"
                />
                </div>
            </div>

            {/* User info */}
            <div>
                <h3 className="font-medium text-base">{selectedUser.fullName}</h3>
                <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                </p>
            </div>
            </div>

            {/* Close button */}
            <button
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-full hover:bg-base-200 active:scale-95 transition cursor-pointer"
            >
            <X />
            </button>
        </div>
        </div>
    );
};
export default ChatHeader;
