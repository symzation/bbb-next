import { createMetadata } from "@/lib/metadata"
import { styles } from "@/utils/constants"
import { cn } from "@/lib/utils"

const metadata = createMetadata({
  title: `Author Terms - ${process.env.NEXT_PUBLIC_SITENAME}`,
  description: `Read the terms and conditions for authors contributing to ${process.env.NEXT_PUBLIC_SITENAME}. Understand your responsibilities, licensing agreements, and guidelines for sharing your reviews and content with our community.`,
})

export default function authorTerms() {
  return (
    <div className={cn(
      styles.pageClass, 
      'flex flex-col items-start justify-center px-4 md:px-20 lg:px-20 py-10'
    )}>
      <h1 className={styles.headingTitle}>Author Terms</h1>
      <p className={styles.paragraph}>
        The Author is responsible for maintaining the confidentiality of their account and password and for restricting access to their computer, and agrees to accept responsibility for all activities that occur under their account or password.
      </p>
      <p className={styles.paragraph}>
        At the time a Work is uploaded to the Website, the Author represents and warrants to Constant-Content and further covenants that:
        <ol className={cn(styles.list, 'list-disc ml-10')}>
          <li className="text-sm py-0.5">
            the Author is the owner or otherwise the duly authorized licensee of all right, title and interest in and to the Works;</li>
          <li className="text-sm py-0.5">
            neither the Works nor any web site or other promotional or marketing material of the Author will contain any content which in the opinion of Constant-Content is or may be construed as being defamatory, obscene, pornographic, misleading, deceptive, fraudulent or otherwise inappropriate, or otherwise contravene the Can-Spam Act of 2003 (United States) or other similar legislation applicable either to the Author or to Constant-Content;
          </li>
          <li className="text-sm py-0.5">
            none of the Works nor any web site of the Author will violate any applicable law or regulation or otherwise contain any viruses, Trojan horses, malware, spyware, adware or other disruptive software, or any software code which is designed to disrupt, damage, or perform unauthorized actions on a computer system, or which transmits data from a user's computer without notice to and the express prior consent of the user;
          </li>
          <li className="text-sm py-0.5">
            the Author will use best efforts to ensure that Constant-Content has at all times current, valid contact information, including without limitation current names, physical address, electronic mail addresses and telephone numbers;
          </li>
          <li className="text-sm py-0.5">
            the Author will use best efforts to ensure that purchasers of the Works will receive prompt, adequate replies to all queries directed to the Author;
          </li>
          <li className="text-sm py-0.5">
            the Author will not make any warranty or representation on behalf of Constant-Content, or otherwise represent to any person that the Author (and those for whom the Author is in law responsible) is an agent of Constant-Content.
          </li>
        </ol>
      </p>
      <p className={styles.paragraph}>
        <span className="font-bold">Licence to Constant-Content</span> - The Author grants to Constant-Content the exclusive right to package, sell and distribute the Works on behalf of the Author and to use and to reproduce the Author's marks and trade-marks, as Constant-Content considers reasonably necessary, in the sale or licence of Works on behalf of the Author. You further authorize Constant-Content, its employees, agents and affiliates to store, resize, copy, distribute, transmit, display, reproduce, transfer, access the Works for any purpose that Constant-Content considers necessary, in its sole discretion. Finally, you authorize Constant-Content to use commercially reasonable efforts to market and sell the Works as necessary, in the opinion of Constant-Content, for the promotion of the Website and the Services. Notwithstanding the foregoing, Constant-Content acknowledges and agrees that it has no right, title or interest in or to the Works save and except as are expressly granted in these Terms.
      </p>
      <p className={styles.paragraph}>
        <span className="font-bold">Licence</span> - Works hosted on the Website must be made available to Members subject to a licence permitting Members to acquire, for a fee fixed by the Author, an irrevocable, royalty-free, exclusive, transferable, and assignable license to use and to modify the Works.
      </p>
    </div>
  )
}