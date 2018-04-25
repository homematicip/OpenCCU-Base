# Makefile for xmlparser

# Load PROJECT_DIR and PLATFORM from local configuration file
LOCAL_CONFIG_FILE=config.mk
ifneq ($(wildcard $(LOCAL_CONFIG_FILE)),)
include $(LOCAL_CONFIG_FILE)
CONFIGURE=
else
CONFIGURE=configure
endif

# Is PROJECT_DIR specified?
ifeq ($(PROJECT_DIR),)
$(error "missing PROJECT_DIR, run make PROJECT_DIR=<project dir>")
endif

# Is PLATFORM specified?
ifeq ($(PLATFORM),)
$(error "missing PLATFORM, run make PLATFORM=<platform>")
endif

# Load project configuration file
PROJECT_CONFIG_FILE = $(PROJECT_DIR)/platform/$(PLATFORM).mk
ifneq ($(wildcard $(PROJECT_CONFIG_FILE)),)
include $(PROJECT_CONFIG_FILE)
else
$(error "missing project configuration; is PLATFORM=$(PLATFORM) valid?")
endif

ROMFSINST = $(shell if [ -x ../../helper_scripts/romfs-inst.sh ]; then echo ../../helper_scripts/romfs-inst.sh; else echo /usr/bin/romfs-inst.sh; fi)

TARGET = libxmlparser

TARGETOBJS = xmlParser.o

ifeq "$(DEBUG)" "1"
OPTIMIZE = -g -O0 -pg
else
OPTIMIZE = -O2 -g
endif

CC = $(CROSS)g++
CXX = $(CROSS)g++
LD = $(CROSS)g++
AR = $(CROSS)ar
STRIP = $(CROSS)strip
CXXFLAGS += -g -Wall -fPIC $(MACHINE_OPTION)
SOFLAGS += -shared -fPIC $(MACHINE_OPTION)

all: $(CONFIGURE) $(TARGET).so $(TARGET).a

configure:
	rm -f $(LOCAL_CONFIG_FILE)
	touch $(LOCAL_CONFIG_FILE)
	echo "PROJECT_DIR=$(PROJECT_DIR)" >> $(LOCAL_CONFIG_FILE)
	echo "PLATFORM=$(PLATFORM)" >> $(LOCAL_CONFIG_FILE)

$(TARGET).so: $(TARGETOBJS)
	$(CXX) $(CXXFLAGS) $(SOFLAGS) -o $(TARGET).so $(TARGETOBJS)
	cp -f  $(TARGET).so $(TARGET).so.debug || true
	$(STRIP) $(TARGET).so || true
	
$(TARGET).a: $(TARGETOBJS)
	$(AR) rcs $(TARGET).a $(TARGETOBJS)

install: $(TARGET).so
	$(ROMFSINST) /lib/$(TARGET).so

package-ccu2:
	install -m 0755 -d $(CCU2_LIB_DIR)
	install -m 0755 $(TARGET).so $(CCU2_LIB_DIR)
	
clean:
	rm -rf *.o
	rm -rf config.mk
	rm -rf $(TARGET).*
