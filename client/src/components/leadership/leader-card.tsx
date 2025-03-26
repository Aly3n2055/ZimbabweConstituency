import { Leader } from "@shared/schema";
import { Mail, Phone, MapPin, Facebook, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface LeaderCardProps {
  leader: Leader;
}

export function LeaderCard({ leader }: LeaderCardProps) {
  // Default image if none provided
  const imageUrl = leader.imageUrl || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt={leader.fullName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-primary bg-opacity-90 text-white p-3">
          <h3 className="font-heading font-semibold text-lg">{leader.fullName}</h3>
          <p className="text-sm">{leader.position}</p>
        </div>
      </div>
      <div className="p-6">
        {leader.email && (
          <div className="flex items-center mb-3">
            <Mail className="text-primary mr-3" size={18} />
            <a href={`mailto:${leader.email}`} className="text-gray-700 hover:text-primary">
              {leader.email}
            </a>
          </div>
        )}
        
        {leader.phoneNumber && (
          <div className="flex items-center mb-3">
            <Phone className="text-primary mr-3" size={18} />
            <a href={`tel:${leader.phoneNumber}`} className="text-gray-700 hover:text-primary">
              {leader.phoneNumber}
            </a>
          </div>
        )}
        
        {leader.location && (
          <div className="flex items-center">
            <MapPin className="text-primary mr-3" size={18} />
            <span className="text-gray-700">{leader.location}</span>
          </div>
        )}
        
        <div className="mt-4 flex space-x-3">
          {leader.facebookUrl && (
            <a 
              href={leader.facebookUrl}
              className="text-gray-600 hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${leader.fullName}'s Facebook`}
            >
              <Facebook size={18} />
            </a>
          )}
          
          {leader.twitterUrl && (
            <a 
              href={leader.twitterUrl}
              className="text-gray-600 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${leader.fullName}'s Twitter`}
            >
              <Twitter size={18} />
            </a>
          )}
          
          {leader.whatsappNumber && (
            <a 
              href={`https://wa.me/${leader.whatsappNumber.replace(/[^0-9]/g, '')}`}
              className="text-gray-600 hover:text-green-500"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${leader.fullName}'s WhatsApp`}
            >
              <FaWhatsapp size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
