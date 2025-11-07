import { useEffect, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { AiOutlineClose } from "react-icons/ai"
import { getCookie, createCookie } from "@/lib/cookies"

export default function AnnouncementsBanner() {
	let announcements: NodeListOf<HTMLElement> | null = null
	let currentIdx = 0

	useEffect(() => {
		// Check if the banner has been dismissed
		const checkBannerDismissed = async () => {
			const bannerDismissed = await isBannerDismissed()
			if (!bannerDismissed) {
				announcements = document.querySelectorAll('.headerAnnouncement')
				// Start the announcement scroll animation
				setInterval(animateAnnouncement, 8000)
			}
		}
		checkBannerDismissed()
	}, [])

	const isBannerDismissed = async () => {
		const bannerDismissedCookie = await getCookie('hide-announcements-banner')
		return bannerDismissedCookie?.valueOf() === 'true'
	}

	const animateAnnouncement = () => {
		if (typeof window !== 'undefined' && announcements && announcements.length > 0) {
			const myElement = announcements[currentIdx] as HTMLElement
			if (!myElement) return

			// Hide the current announcement
			myElement.classList.toggle('animate-fadeInUp')

			// Move to the next announcement index
			++currentIdx
			if (currentIdx >= announcements.length) {
				currentIdx = 0
			}

			myElement.classList.toggle('animate-fadeOutUp')
		}
	} 

	const closeBanner = () => {
		createCookie('hide-announcements-banner', 'true', 30) // Expires in 30 days
	}

	return (
    <div className={cn(styles.headerBanner, "relative")}>
			<div id="AnnoncementBanner" className="text-sm text-white text-center w-full h-8 flex flex-col justify-center items-center">
				{/* {items.map((item) => (
					<div key={item.id} className="w-full text-center h-8 py-6">
						{item.content}
					</div>
				))}  */}
				<div className="headerAnnouncement animate-fadeInUp text-center py-2">
					Annoncement - 1
				</div>
				<div className="headerAnnouncement animate-fadeInUp text-center py-2">
					Annoncement - 2
				</div>
				<div className="headerAnnouncement animate-fadeInUp text-center py-2">
					Annoncement - 3
				</div>
			</div>
			<AiOutlineClose 
				className="absolute right-2 top-2.5 cursor-pointer w-3 h-3 text-white hover:text-fourth transition-all duration-150 ease-in-out" 
				onClick={closeBanner}
			/>
    </div>
	)
}

/* const startAnnouncementScroll = () => {
		setInterval(() => {
			animateAnnouncement()
		}, 5000)
	}

	const animateAnnouncement = () => {
		if (typeof window !== 'undefined') {		

		const announcements = document.getElementsByClassName('headerAnnouncement')

		const myElement = document.getElementById('Announcement-1')
		myElement.classList.toggle('animate-fadeInUp') // Or any other animation class

		setTimeout(() => {
			myElement.classList.toggle('animate-fadeOutUp')
		}, 2000) 
		}
	} */

	/* const announcements = document.getElementsByClassName('headerAnnouncement');

	let announcementIndex = 0;

	function showNextAnnouncement() {
		// If the index has reached the end of the array, start over
		if (announcementIndex >= announcements.length) {
				announcementIndex = 0;
		}

		// Update the text content of the display element
		//announcementDisplay.textContent = announcements[announcementIndex];

		const announcementId = announcements[announcementIndex];
		myElement.classList.toggle('animate-fadeInUp') // Or any other animation class

		setTimeout(() => {
			myElement.classList.toggle('animate-fadeOutUp')
			announcementIndex++
			showNextAnnouncement()
		}, 2000) 

		// Move to the next announcement for the next cycle
	} */

	// Immediately display the first announcement to avoid a blank space
	//showNextAnnouncement();

	// Start the interval timer to show the next announcement every 3 seconds
	//setInterval(showNextAnnouncement, 3000);
