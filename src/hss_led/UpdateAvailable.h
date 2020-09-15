/*
 * UpdateAvailable.h
 *
 *  Created on: 18.01.2013
 *      Author: willms
 */

#ifndef UPDATEAVAILABLE_H_
#define UPDATEAVAILABLE_H_
#if !defined(PLATFORM_CCU3)
#include "Info.h"
#include <string>
class UpdateAvailable:public Info {
public:
	UpdateAvailable();
	virtual ~UpdateAvailable();
	virtual bool isInfoPending();
private:
	bool updateAvailable;
	std::string currentVersion;
	std::string serialNumber;
	std::string availableVersion;
	unsigned long lastUpdateServerRequest;
	unsigned long waitRequesTime;
	bool requestUpdateServer();

};
#endif

#endif /* UPDATEAVAILABLE_H_ */
