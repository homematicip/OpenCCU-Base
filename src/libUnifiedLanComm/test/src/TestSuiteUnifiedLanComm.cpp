/*
 * TestSuiteUnifiedLanComm.cpp
 *
 *  Created on: May 31, 2013
 *      Author: niclaus
 */
//Googles gtest
#include "gtest/gtest.h"

//Test for CommonConversion.h
#include "TestCommonConversion.h"
#include "TestUnifiedLanProtocolTypeConverter.h"


int main(int argc, char**argv)
{
	::testing::InitGoogleTest(&argc, argv);
	return RUN_ALL_TESTS();
}

