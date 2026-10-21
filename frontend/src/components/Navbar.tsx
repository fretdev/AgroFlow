import Link from "next/link";
import {navLinks} from "@/src/constants";

export default function Navbar() {
    return(
        <nav>
           <div>
               <p>Agroflow</p>
               <ul>
                   {navLinks.map((link)=>(
                       <li key={link.id}>
                           <Link href={link.href}>{link.title}</Link>
                       </li>
                   ))}
               </ul>
           </div>
        </nav>
    )
}