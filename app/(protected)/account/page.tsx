'use client';
import Account from "@/app/ui/account/Account";
import { SessionProvider} from "next-auth/react";
// import ManagerSelect from "../../ui/dashboard/ManagerCard/ManagerSelect";

export default function AccountPage() {
    return (
        <SessionProvider>
           <Account/>
           <div>
{/* <h2>Выберите менеджера</h2> */}
           {/* <ManagerSelect /> */}
           </div>

         </SessionProvider>
    );
}


