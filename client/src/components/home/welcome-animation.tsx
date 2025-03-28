import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHonorableByKey } from "@/lib/honorables-data";

export default function WelcomeAnimation() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const honorableMauka = getHonorableByKey("Mr_Tauya_Mauka");
  
  // Auto-dismiss after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  // Flag colors based on Zimbabwe and ZANU-PF
  const colors = {
    green: "#006400",
    yellow: "#FFD700",
    red: "#FF0000",
    black: "#000000",
    white: "#FFFFFF",
  };

  if (!showWelcome) return null;

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div 
            className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 z-10"
              onClick={() => setShowWelcome(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {/* Top Flag-inspired Banner */}
            <div className="flex h-6">
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.green }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.yellow }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.red }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.black }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.white }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </div>
            
            <div className="flex flex-col md:flex-row">
              {/* Left side with logos and emblems */}
              <div className="w-full md:w-1/3 bg-[#006400] p-6 flex flex-col items-center justify-center">
                <motion.img 
                  src="/attached_assets/ZANU_PF_logo.png" 
                  alt="ZANU-PF Logo" 
                  className="w-32 h-32 object-contain mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                />
                
                <motion.img 
                  src="/attached_assets/Flag_of_ZANU-PF.svg.png" 
                  alt="ZANU-PF Flag" 
                  className="w-full max-w-[200px] object-contain"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.0 }}
                />
              </div>
              
              {/* Right side with welcome message */}
              <div className="w-full md:w-2/3 p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-[#006400] mb-4">
                    Welcome to Kuwadzana West Constituency
                  </h2>
                  
                  <p className="text-lg mb-6">
                    Representing the people with transparency, integrity, and dedication.
                  </p>
                  
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <img 
                        src="/attached_assets/270a-1f3fe.png" 
                        alt="Raised Fist" 
                        className="w-6 h-6 mr-2" 
                      />
                      <p>Led by Hon. {honorableMauka?.name || "Tauya Mauka"}</p>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.7 }}
                    >
                      <img 
                        src="/attached_assets/1f1ff-1f1fc.png" 
                        alt="Zimbabwe Flag" 
                        className="w-6 h-6 mr-2" 
                      />
                      <p>Serving the community since 1980</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.9 }}
                    >
                      <p>Our platform provides:</p>
                      <ul className="list-disc list-inside ml-4 mt-2">
                        <li>Community news and updates</li>
                        <li>Development project tracking</li>
                        <li>Constituency leadership profiles</li>
                        <li>Upcoming events and opportunities</li>
                      </ul>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.1 }}
                  >
                    <Button 
                      className="bg-[#006400] hover:bg-[#004d00] text-white"
                      onClick={() => setShowWelcome(false)}
                    >
                      Explore Constituency Portal
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Bottom Flag-inspired Banner */}
            <div className="flex h-6">
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.white }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.black }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.red }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.yellow }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.div 
                className="w-1/5" 
                style={{ backgroundColor: colors.green }}
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}