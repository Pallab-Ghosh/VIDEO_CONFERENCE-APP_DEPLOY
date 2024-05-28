import { Button } from '@/components/ui/button';
import { OwnCapability, PermissionRequestEvent, StreamVideoEvent, useCall, useCallStateHooks, useRequestPermission } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'



  export const MyPermissionRequestNotifications = () => {
    const call = useCall();
    const { useLocalParticipant, useHasPermissions } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const canUpdateCallPermissions = useHasPermissions(OwnCapability.UPDATE_CALL_PERMISSIONS,);

    const [permissionRequests, setPermissionRequests] = useState<PermissionRequestEvent[]>([]);
  
    useEffect(() => {
        
      if (!call) return;
     
      const unsubscribe = call.on( 'call.permission_request', (event) => {
          // ignore own requests
          if (event.user.id!== localParticipant?.userId) {
            setPermissionRequests((requests) => [ ...requests , event as PermissionRequestEvent]);
          }
        },
      );

      return () => {
        unsubscribe();
      };
    }, [call, canUpdateCallPermissions, localParticipant]);
    
  
    if (!call || permissionRequests.length === 0) {
      return null;
    }
  
    const answerRequest = async (answer:string, request:any) => {
      if (answer === 'accept') {
        await call.grantPermissions(request.user.id, request.permissions);
      } 
      else
       {
        await call.revokePermissions(request.user.id, request.permissions);
      }
      setPermissionRequests((requests) => requests.filter((r) => r !== request));
    };

  
    return (
      <div className=' text-white '>
        {
        permissionRequests.map((request) => (
          <div>
            New request from {request?.user?.name} to publish {request.permissions}
            <Button onClick={() => answerRequest('accept', request)} className=' bg-blue-800 focus:ring-0 ml-2 mr-2 cursor-pointer'>
              Accept
            </Button>

            <Button onClick={() => answerRequest('reject', request)} className=' bg-red-600  focus:ring-0 ml-2 mr-2 cursor-pointer'>
              Reject
            </Button>
          </div>
        ))}
      </div>
    );
  };






  
