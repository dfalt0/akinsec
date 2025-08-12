import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle } from 'lucide-react';

const RepercussionModal = ({ repercussion, isOpen, onClose }) => {
  if (!repercussion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-red-900">
            <AlertTriangle className="w-5 h-5" />
            {repercussion.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Overview</h3>
            <p className="text-slate-700 leading-relaxed">{repercussion.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Details</h3>
            <p className="text-slate-700 leading-relaxed">{repercussion.details}</p>
          </div>
          
          {repercussion.examples && repercussion.examples.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Real-World Examples</h3>
              <div className="space-y-3">
                {repercussion.examples.map((example, index) => (
                  <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-slate-700 text-sm leading-relaxed" 
                       dangerouslySetInnerHTML={{ __html: example }} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 italic">
              Understanding these risks is crucial for any organization handling sensitive data or operating in regulated industries.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepercussionModal; 