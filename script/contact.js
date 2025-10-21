// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_ps7wl0l";      // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = "template_ovj4nsh";    // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = "wK_VlyvU1Zh1ABffy";  // Replace with your Public Key

// Initialize EmailJS (call this in your HTML before using)
function initEmailJS() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Format hotels array for email
function formatHotelsForEmail(hotels, cityName) {
    if (hotels.length === 0) {
        return `No ${cityName} hotel preferences specified`;
    }
    return hotels.map((h, i) => 
        `Option ${i + 1}: ${h.name} | Distance: ${h.distance} | Rating: ${h.star} | Nights: ${h.nights}`
    ).join('\n');
}

// Format transport array for email
function formatTransportForEmail(transport) {
    if (transport.length === 0) {
        return 'No transportation queries';
    }
    return transport.map((t, i) => 
        `Query ${i + 1}: Type: ${t.type} | Route: ${t.route} | Details: ${t.details}`
    ).join('\n');
}

// Send Umrah inquiry email
function sendUmrahInquiryEmail(formData) {
    // Prepare email parameters matching the template variables
    const params = {
        company_logo: "https://logo.softwaresolutionhouse.com/Images/Abbasi.jpg",
        company_name: "Abbasi Hajj & Umrah Company",
        from_whatsapp: "0307-3044150",
        to_email: "abbasi.hajjumrah@gmail.com",
        from_email: "mohammadsaqibabbasi@gmail.com",
        website: "https://abbasihajjumrah.com",
        email: "abbasi.hajjumrah@gmail.com",

        // Guest Information
        guest_name: formData.guestName || 'N/A',
        care_of_name: formData.careOfName || 'N/A',
        contact_no: formData.contactNo || 'N/A',
        
        // Travel Details
        adult_count: formData.adultCount || '0',
        child_count: formData.childCount || '0',
        infant_count: formData.infantCount || '0',
        room_type: formData.roomType || 'N/A',
        package_days: formData.packageDays || 'N/A',
        departure_date: formData.departureDate || 'N/A',
        airline_preference: formData.airlinePreference || 'N/A',
        departure_city: formData.departureCity || 'N/A',
        arrival_city: formData.arrivalCity || 'N/A',
        
        // Hotel Preferences (formatted)
        makkah_hotels: formatHotelsForEmail(formData.makkahHotels || [], 'Makkah'),
        madina_hotels: formatHotelsForEmail(formData.madinaHotels || [], 'Madina'),
        
        // Transportation (formatted)
        transportation: formatTransportForEmail(formData.transportationQueries || []),
        
        // Submission metadata
        submission_date: new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Send email using EmailJS
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(function(response) {
            console.log('✅ Email sent successfully!', response.status, response.text);
            showModal("✅ Inquiry submitted successfully! A team member will contact you soon, Insha'Allah.", "success");
            return response;
        })
        .catch(function(error) {
            console.error('❌ Email failed:', error);
            showModal("❌ Failed to submit inquiry. Please try again or contact us directly via WhatsApp.", "error");
            throw error;
        });
}

// Show modal message
function showModal(message, type = "success") {
    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");

    if (!modal || !modalMessage) {
        // Fallback to alert if modal doesn't exist
        alert(message);
        return;
    }

    // Reset classes
    modalMessage.className = "";
    modalMessage.classList.add(type === "success" ? "modal-success" : "modal-error");

    // Set message
    modalMessage.textContent = message;

    // Show modal
    modal.style.display = "flex";

    // Auto hide after 3 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 3000);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initEmailJS,
        sendUmrahInquiryEmail,
        showModal
    };
}

