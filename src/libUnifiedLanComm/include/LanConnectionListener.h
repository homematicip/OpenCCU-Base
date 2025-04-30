#ifndef _LANCONNECTIONLISTENER_H_
#define _LANCONNECTIONLISTENER_H_

#include <DLLImportExportULC.h>

namespace ulc {

/** \brief Listener class for LanConnection.
 * \details Inheriting classes can (un)register a LanConnectionListener at LanConnection.*/
LIBUNIFIEDLANCOMM_API class LanConnectionListener {

public:
	virtual ~LanConnectionListener();
	virtual void onDisconnect() = 0;
};

}//namespace

#endif
